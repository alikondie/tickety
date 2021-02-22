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

    return res.status(400).send({ errors: formatedErrors });
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({
      errors: [
        {
          message: err.reason,
        },
      ],
    });
  }
  res.status(400).send({
    errors: [{ message: 'Hmm, Something went wrong' }],
  });
};
