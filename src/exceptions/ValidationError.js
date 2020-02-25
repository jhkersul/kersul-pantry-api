import BaseError from './BaseError';

class ValidationError extends BaseError {
  constructor(details = [], message = 'Validation error') {
    const statusCode = 422;
    super(statusCode, message, details);
  }
}

export default ValidationError;
