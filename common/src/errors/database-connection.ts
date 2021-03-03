import { BaseError } from './base-error';

export class DatabaseConnectionError extends BaseError {
  statusCode = 500;
  message = 'Error connecting to database :(';

  constructor() {
    super('Error connecting to DB');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
