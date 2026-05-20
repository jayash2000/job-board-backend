import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { refreshTokens, users } from '../../db/schema';

export const findUserByEmail = (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const createUser = (data: typeof users.$inferInsert) => {
  return db.insert(users).values(data);
};

export const storeRefreshToken = (data: typeof refreshTokens.$inferInsert) => {
  return db.insert(refreshTokens).values(data);
};

export const findRefreshToken = (token: string) => {
  return db.query.refreshTokens.findFirst({
    where: eq(refreshTokens.token, token),
  });
};

export const deleteRefreshToken = (token: string) => {
  return db.delete(refreshTokens).where(eq(refreshTokens.token, token));
};
