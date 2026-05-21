import z from 'zod';

export const updateCandidateSchema = z.object({
  fullName: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  skills: z.string().trim().optional(),
  location: z.string().trim().optional(),
  githubUrl: z.url().trim().optional(),
  linkedinUrl: z.url().trim().optional(),
});

export const updateEmployerSchema = z.object({
  companyName: z.string().trim().optional(),
  companyWebsite: z.string().trim().optional(),
  companyDescription: z.string().trim().optional(),
  location: z.string().trim().optional(),
});

export type UpdateCandidateSchema = z.infer<typeof updateCandidateSchema>;
export type UpdateEmployerSchema = z.infer<typeof updateEmployerSchema>;
