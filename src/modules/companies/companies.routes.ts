import { Router } from 'express';
import { authorize, protect } from '../auth/auth.middleware';
import {
  createCompany,
  getCompany,
  updateCompany,
} from './companies.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createCompanySchema, updateCompanySchema } from './companies.schema';

const router = Router();

router
  .route('/')
  .post(
    protect,
    authorize('employer'),
    validate(createCompanySchema),
    createCompany,
  );

router
  .route('/:id')
  .get(getCompany)
  .patch(
    protect,
    authorize('employer'),
    validate(updateCompanySchema),
    updateCompany,
  );

export default router;
