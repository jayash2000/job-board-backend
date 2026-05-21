import bcrypt from 'bcrypt';

import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

import {
  createUser,
  deleteRefreshToken,
  findRefreshToken,
  findUserByEmail,
  storeRefreshToken,
} from './auth.repository';

import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from './auth.utils';

import { AppError } from '../../utils/AppError';
import { env } from '../../config/env';

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
  if (!isPasswordValid) throw new AppError('Invalid credentials', 401);

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

/*
REFRESH SESSION
- payload (id, role)
- (token)
- verify original token first
- hash token
- error if hashed token not matches in database
- verify token
- delete old refresh token
- generate new access and refresh token
- store new refresh token in database
- return access token and refresh token
*/
export const refreshUserSession = async (token: string) => {
  let payload: {
    id: string;
    role: string;
  };

  try {
    payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as {
      id: string;
      role: string;
    };
  } catch (error) {
    throw new AppError('Expired or invalid refresh token', 401);
  }

  const hashed = hashToken(token);

  const existing = await findRefreshToken(hashed);
  if (!existing) throw new AppError('Invalid refresh token', 401);

  await deleteRefreshToken(hashed);

  const newAccessToken = generateAccessToken(payload.id, payload.role);
  const newRefreshToken = generateRefreshToken(payload.id, payload.role);

  await storeRefreshToken({
    id: uuid(),
    userId: payload.id,
    token: hashToken(newRefreshToken),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutUser = async (token: string) => {
  const hashed = hashToken(token);

  await deleteRefreshToken(hashed);
};
