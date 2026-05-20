import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { registerSchema } from './auth.schema';
import { loginUser, registerUser } from './auth.service';
import { apiResponse } from '../../utils/apiResponse';
import { env } from '../../config/env';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, confirmPassword, role } = req.body;

  const user = await registerUser(email, password, role);
  res.status(201).json(apiResponse(user, 'User registered successfully'));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json(apiResponse(result, 'Login successful'));
});
