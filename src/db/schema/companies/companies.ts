import { varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { users } from '../users';
import { text } from 'drizzle-orm/mysql-core';
import { boolean } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/mysql-core';

export const companies = mysqlTable('companies', {
  id: varchar('id', { length: 191 }).primaryKey(),

  ownerId: varchar('owner_id', { length: 191 })
    .references(() => users.id)
    .notNull(),

  name: varchar('name', { length: 255 }).notNull(),

  description: text('description'),

  website: varchar('website', { length: 500 }),
  location: varchar('location', { length: 255 }),

  logoUrl: varchar('logo_url', { length: 500 }),

  isVerified: boolean('is_verified').default(false).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
