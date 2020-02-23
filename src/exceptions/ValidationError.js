import BaseError from './BaseError';

class ValidationError extends BaseError {
  constructor(details = []) {
    const statusCode = 422;
    const message = 'Validation error';
    super(statusCode, message, details);
  }
}

export default ValidationError;
