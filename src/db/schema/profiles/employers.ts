import { varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { users } from '../users';
import { text } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/mysql-core';

export const employers = mysqlTable('employer_profiles', {
  id: varchar('id', { length: 191 }).primaryKey(),

  userId: varchar('user_id', { length: 191 })
    .references(() => users.id)
    .notNull()
    .unique(),

  companyName: varchar('company_name', { length: 255 }),
  companyWebsite: varchar('company_website', { length: 500 }),
  companyDescription: text('company_description'),

  logoUrl: varchar('logo_url', { length: 500 }),

  location: varchar('location', { length: 255 }),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
