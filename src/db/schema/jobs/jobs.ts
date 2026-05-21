import { varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { companies } from '../companies/companies';
import { text } from 'drizzle-orm/mysql-core';
import { int } from 'drizzle-orm/mysql-core';
import { boolean } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/mysql-core';

export const jobs = mysqlTable('jobs', {
  id: varchar('id', { length: 191 }).primaryKey(),

  companyId: varchar('company_id', { length: 191 })
    .references(() => companies.id)
    .notNull(),

  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  location: varchar('location', { length: 255 }),

  employmentType: varchar('employment_type', { length: 50 }).notNull(),

  salaryMin: int('salary_min'),
  salaryMax: int('salary_max'),

  isActive: boolean('is_active').default(true).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
