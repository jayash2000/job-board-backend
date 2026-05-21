import {
  getCandidateProfile,
  getEmployerProfile,
  upsertCandidateProfile,
  upsertEmployerProfile,
} from './users.repository';
import { UpdateCandidateSchema, UpdateEmployerSchema } from './users.schema';
import { v4 as uuid } from 'uuid';

export const updateCandidateProfile = async (
  userId: string,
  data: UpdateCandidateSchema,
) => {
  return upsertCandidateProfile({
    id: uuid(),
    userId,
    ...data,
  });
};

export const updateEmployerProfile = async (
  userId: string,
  data: UpdateEmployerSchema,
) => {
  return upsertEmployerProfile({
    id: uuid(),
    userId,
    ...data,
  });
};

export const getMyProfile = async (userId: string, role: string) => {
  if (role === 'candidate') {
    return getCandidateProfile(userId);
  }

  return getEmployerProfile(userId);
};
