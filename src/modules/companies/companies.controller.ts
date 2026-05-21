import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { createOne, getPublicCompany, updateOne } from './companies.service';
import { apiResponse } from '../../utils/apiResponse';

export const createCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    await createOne(userId, req.body);

    res.status(201).json(apiResponse(null, 'Company created successfully'));
  },
);

export const updateCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const companyId = req.params.id as string;
    const ownerId = req.user!.id;

    await updateOne(companyId, ownerId, req.body);

    res.json(apiResponse(null, 'Company updated successfully'));
  },
);

export const getCompany = asyncHandler(async (req: Request, res: Response) => {
  const companyId = req.params.id as string;

  const company = await getPublicCompany(companyId);

  res.json(apiResponse(company ?? null, 'Fetched public company info'));
});
