import { Router } from 'express';

import { authorize, protect } from '../auth/auth.middleware';

import { validate } from '../../middlewares/validate.middleware';
import { createJobSchema, updateJobSchema } from './jobs.schema';

import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
} from './jobs.controller';

const router = Router();

router
  .route('/')
  .get(getAllJobs)
  .post(protect, authorize('employer'), validate(createJobSchema), createJob);

router
  .route('/:id')
  .get(getJobById)
  .patch(protect, authorize('employer'), validate(updateJobSchema), updateJob);

export default router;
