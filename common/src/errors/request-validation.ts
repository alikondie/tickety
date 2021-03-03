import { param, ValidationError } from 'express-validator';
import { BaseError } from './base-error';

export class RequestValidationError extends BaseError {
  statusCode = 400;

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }

  constructor(public errors: ValidationError[]) {
    super('Error in user params');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
