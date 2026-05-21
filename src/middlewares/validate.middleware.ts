import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';

export const validate =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      const errorMessage =
        error instanceof ZodError
          ? error.issues[0].message
          : 'Validation error occurred';

      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  };
