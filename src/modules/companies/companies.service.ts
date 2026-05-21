import { AppError } from '../../utils/AppError';
import {
  createCompany,
  getCompanyById,
  getCompanyByOwnerId,
  updateCompanyById,
} from './companies.repository';
import { CreateCompanySchema, UpdateCompanySchema } from './companies.schema';
import { v4 as uuid } from 'uuid';

/*
- error if company already exists
- create company
*/
export const createOne = async (ownerId: string, data: CreateCompanySchema) => {
  const existing = await getCompanyByOwnerId(ownerId);

  if (existing) throw new AppError('Company already exists', 409);

  await createCompany({
    id: uuid(),
    ownerId,
    ...data,
  });
};

/*
- search existing company by company id
- not found, error
- check if company belongs to this user
- not, error
- update compant
*/
export const updateOne = async (
  companyId: string,
  ownerId: string,
  data: UpdateCompanySchema,
) => {
  const company = await getCompanyById(companyId);
  if (!company) throw new AppError('Company not found', 404);

  if (company.ownerId !== ownerId) throw new AppError('Forbidden', 403);

  await updateCompanyById(companyId, data);
};

export const getPublicCompany = async (companyId: string) => {
  return getCompanyById(companyId);
};

export const getMyCompany = async (ownerId: string) => {
  return getCompanyByOwnerId(ownerId);
};
