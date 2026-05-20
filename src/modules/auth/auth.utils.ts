import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import crypto from 'crypto';

export const generateAccessToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
