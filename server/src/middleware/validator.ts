import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync(req.body);
        next();
      } catch (error) {
        let err = error;
        if (err instanceof z.ZodError) {
          err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
        }
        return res.status(409).json({
          status: 'validation error',
          error: err,
        });
      }
    };
