import { timestamp } from 'drizzle-orm/mysql-core';
import { varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';

export const refreshTokens = mysqlTable('refresh_tokens', {
  id: varchar('id', { length: 191 }).primaryKey(),

  userId: varchar('user_id', { length: 191 }).notNull(),

  token: varchar('token', { length: 255 }).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
