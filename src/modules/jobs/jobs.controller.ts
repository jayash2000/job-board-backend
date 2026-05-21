import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { createOne, getAll, getOne, updateOne } from './jobs.service';
import { apiResponse } from '../../utils/apiResponse';

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  await createOne(userId, req.body);
  res.status(201).json(apiResponse(null, 'Job created successfully'));
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const jobId = req.params.id as string;
  await updateOne(userId, jobId, req.body);
  res.json(apiResponse(null, 'Job updated successfully'));
});

export const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const jobs = await getAll(query);
  res.json(
    apiResponse(
      {
        page: Number(query.page) || 1,
        count: jobs.length,
        jobs,
      },
      'Jobs fetched successfully',
    ),
  );
});

export const getJobById = asyncHandler(async (req: Request, res: Response) => {
  const jobId = req.params.id as string;
  const job = await getOne(jobId);
  res.json(apiResponse(job, 'Fetched required job info'));
});
