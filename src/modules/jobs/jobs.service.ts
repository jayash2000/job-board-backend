import { v4 as uuid } from 'uuid';
import { AppError } from '../../utils/AppError';
import {
  createJob,
  getCompanyByOwner,
  getJobById,
  searchJobs,
  updateJobById,
} from './jobs.repository';
import { CreateJobSchema, UpdateJobSchema } from './jobs.schema';

/*
- Proceed only if job belongs to your company
- Create job
*/
export const createOne = async (ownerId: string, data: CreateJobSchema) => {
  const company = await getCompanyByOwner(ownerId);
  if (!company) throw new AppError('Create company first', 400);

  await createJob({
    ...data,
    id: uuid(),
    companyId: company.id,
  });
};

/*
- Proceed only if company exists
- Proceed only if job with ID exists
- Proceed only if job is of the required company
- Update job
*/
export const updateOne = async (
  ownerId: string,
  jobId: string,
  data: UpdateJobSchema,
) => {
  const company = await getCompanyByOwner(ownerId);
  if (!company) throw new AppError('Company not found', 404);

  const job = await getJobById(jobId);
  if (!job) throw new AppError('Job not found', 404);

  if (job.companyId !== company.id) throw new AppError('Forbidden', 403);

  await updateJobById(jobId, data);
};

export const getAll = async (query: any) => {
  return searchJobs(
    query.search,
    query.location,
    query.employmentType,
    Number(query.page || 1),
    Number(query.limit || 10),
  );
};

export const getOne = async (jobId: string) => {
  return getJobById(jobId);
};
