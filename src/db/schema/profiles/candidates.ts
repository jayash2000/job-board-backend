import { varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { users } from '../users';
import { text } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/mysql-core';

export const candidates = mysqlTable('candidate_profiles', {
  id: varchar('id', { length: 191 }).primaryKey(),

  userId: varchar('user_id', { length: 191 })
    .references(() => users.id)
    .notNull()
    .unique(),

  fullName: varchar('full_name', { length: 255 }),

  bio: text('bio'),
  skills: text('skills'),

  resumeUrl: varchar('resume_url', { length: 500 }),
  avatarUrl: varchar('avatar_url', { length: 500 }),

  location: varchar('location', { length: 255 }),

  githubUrl: varchar('github_url', { length: 500 }),
  linkedinUrl: varchar('linkedin_url', { length: 500 }),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
