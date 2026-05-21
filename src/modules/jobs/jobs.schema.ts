import z from 'zod';

export const createJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Job title must be at least 2 characters long'),

  description: z
    .string()
    .trim()
    .min(20, 'Job description must be at least 20 characters long'),

  location: z.string().trim().optional(),

  employmentType: z
    .enum(['full-time', 'part-time', 'contract', 'internship'])
    .default('full-time'),

  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
});

export const updateJobSchema = createJobSchema.partial();

export type CreateJobSchema = z.infer<typeof createJobSchema>;
export type UpdateJobSchema = z.infer<typeof updateJobSchema>;
