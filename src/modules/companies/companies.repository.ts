import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { companies } from '../../db/schema';

export const createCompany = (data: typeof companies.$inferInsert) => {
  return db.insert(companies).values(data);
};

export const getCompanyByOwnerId = (ownerId: string) => {
  return db.query.companies.findFirst({
    where: eq(companies.ownerId, ownerId),
  });
};

export const getCompanyById = (id: string) => {
  return db.query.companies.findFirst({
    where: eq(companies.id, id),
  });
};

export const updateCompanyById = (
  id: string,
  data: Partial<typeof companies.$inferInsert>,
) => {
  return db.update(companies).set(data).where(eq(companies.id, id));
};
