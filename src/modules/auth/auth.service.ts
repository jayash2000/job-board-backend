import bcrypt from 'bcrypt';

import { v4 as uuid } from 'uuid';

import {
  createUser,
  findUserByEmail,
  storeRefreshToken,
} from './auth.repository';

import { AppError } from '../../utils/AppError';
import { isValid } from 'zod/v3';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from './auth.utils';

/*
REGISTER USER
- email, password, role
- error if existing email
- hash password
- new uuid
- create user
- return id, email, role
*/
export const registerUser = async (
  email: string,
  password: string,
  role: 'candidate' | 'employer' | 'admin',
) => {
  const existing = await findUserByEmail(email);

  if (existing) throw new AppError('Email already in use', 409);

  const hashedPassword = await bcrypt.hash(password, 12);

  const userId = uuid();

  await createUser({
    id: userId,
    email,
    password: hashedPassword,
    role,
  });

  return {
    id: userId,
    email,
    role,
  };
};

/*
LOGIN USER
- email, password
- error if email not exists
- error if password not match or valid
- generate access & refresh token
- store refresh token
- return access token, refresh token, user (id, email, role)
*/
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError('Invalid credentials', 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new AppError('Invalid credentials', 401);

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id, user.role);

  await storeRefreshToken({
    id: uuid(),
    userId: user.id,
    token: hashToken(refreshToken),
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};
