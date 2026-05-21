import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  getMyProfile,
  updateCandidateProfile,
  updateEmployerProfile,
} from './users.service';
import { apiResponse } from '../../utils/apiResponse';

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const role = req.user?.role;

    role === 'candidate'
      ? updateCandidateProfile(req.user!.id, req.body)
      : updateEmployerProfile(req.user!.id, req.body);

    res.json(apiResponse(null, 'Profile updated'));
  },
);

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await getMyProfile(req.user!.id, req.user!.role);

  res.json(apiResponse(profile, 'Fetched profile info successfully'));
});
