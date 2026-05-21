import { and, desc, eq, like } from 'drizzle-orm';
import { db } from '../../db';
import { companies, jobs } from '../../db/schema';

export const createJob = (data: typeof jobs.$inferInsert) => {
  return db.insert(jobs).values(data);
};

export const getCompanyByOwner = (ownerId: string) => {
  return db.query.companies.findFirst({
    where: eq(companies.ownerId, ownerId),
  });
};

export const getJobById = (id: string) => {
  return db.query.jobs.findFirst({
    where: eq(jobs.id, id),
  });
};

export const updateJobById = (
  id: string,
  data: Partial<typeof jobs.$inferInsert>,
) => {
  return db.update(jobs).set(data).where(eq(jobs.id, id));
};

/*
- set offset
- set active jobs filter, only if job is active
- set search filter by title, if text-based search
- set search filter by location, if location-based search
- set employment type filter
- find jobs based on the filter
*/
export const searchJobs = (
  search?: string,
  location?: string,
  employmentType?: string,
  page = 1,
  limit = 10,
) => {
  const offset = (page - 1) * limit;

  const filters = [eq(jobs.isActive, true)];

  if (search) {
    filters.push(like(jobs.title, `%${search}%`));
  }

  if (location) {
    filters.push(like(jobs.location, `%${location}%`));
  }

  if (employmentType) {
    filters.push(eq(jobs.employmentType, employmentType));
  }

  return db.query.jobs.findMany({
    where: and(...filters),
    limit,
    offset,
    orderBy: [desc(jobs.createdAt)],
  });
};
