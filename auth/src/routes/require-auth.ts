import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '@tiktaktickety/common';

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new ForbiddenError();
  }
  next();
};
