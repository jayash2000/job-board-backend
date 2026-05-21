import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { candidates, employers } from '../../db/schema';

/*
upsert:
- create if missing
- update if existing
*/
export const upsertCandidateProfile = (
  data: typeof candidates.$inferInsert,
) => {
  return db.insert(candidates).values(data).onDuplicateKeyUpdate({ set: data });
};

export const upsertEmployerProfile = (data: typeof employers.$inferInsert) => {
  return db.insert(employers).values(data).onDuplicateKeyUpdate({ set: data });
};

export const getCandidateProfile = (userId: string) => {
  return db.query.candidates.findFirst({
    where: eq(candidates.userId, userId),
  });
};

export const getEmployerProfile = (userId: string) => {
  return db.query.employers.findFirst({
    where: eq(employers.userId, userId),
  });
};
