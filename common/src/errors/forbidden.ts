import { BaseError } from './base-error';

export class ForbiddenError extends BaseError {
  statusCode = 401;

  constructor() {
    super('Access Unauthorized');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Access Unauthorized' }];
  }
}
