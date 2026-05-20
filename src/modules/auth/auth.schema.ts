import z from 'zod';

const emailValidation = z
  .email('Invalid email address')
  .trim()
  .max(255, 'Email address has maximum length of 255 characters');

export const registerSchema = z
  .object({
    email: emailValidation,

    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
      .regex(/[a-z]/, 'Password must include at least one lowercase letter')
      .regex(/[0-9]/, 'Password must be include at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must include at least one special character',
      ),

    confirmPassword: z.string().trim().min(1, 'Password is empty'),

    role: z.enum(['candidate', 'employer']).default('candidate'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: emailValidation,

  password: z.string().trim().min(1, 'Password is empty'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
