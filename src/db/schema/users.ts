import { boolean } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/mysql-core';
import { mysqlEnum, varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';

const usersRoleEnum = mysqlEnum('role', ['candidate', 'employer', 'admin']);

export const users = mysqlTable('users', {
  // varchar(191): Common compatibility-safe size for indexed UTF8 strings in MySQL.
  id: varchar('id', { length: 191 }).primaryKey(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  password: varchar('password', { length: 255 }).notNull(),

  role: usersRoleEnum.default('candidate').notNull(),

  isVerified: boolean('is_verified').default(false).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
