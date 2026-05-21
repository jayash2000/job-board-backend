import { Request, Response } from 'express';

import { env } from '../../config/env';

import { registerSchema } from './auth.schema';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from './auth.service';

import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';
import { AppError } from '../../utils/AppError';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

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

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new AppError('Missing refresh token', 401);

  const tokens = await refreshUserSession(refreshToken);

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json(
    apiResponse(
      {
        accessToken: tokens.accessToken,
      },
      'Session refreshed',
    ),
  );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new AppError('Empty refresh token, 401');

  await logoutUser(refreshToken);

  res.clearCookie('refreshToken');

  res.json(apiResponse(null, 'Logged out successfully'));
});
