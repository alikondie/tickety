import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection';
import { RequestValidationError } from '../errors/request-validation';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formatedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
  if (err instanceof DatabaseConnectionError) {
    console.log('database connection error');
  }
  res.status(400).send({
    message: err.message,
  });
};
