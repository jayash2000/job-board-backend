import z from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(2, 'Company name must have at least 2 characters'),

  description: z.string().optional(),

  website: z.url().optional(),

  location: z.string().optional(),
});

export const updateCompanySchema = createCompanySchema.partial();

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
export type UpdateCompanySchema = z.infer<typeof updateCompanySchema>;
