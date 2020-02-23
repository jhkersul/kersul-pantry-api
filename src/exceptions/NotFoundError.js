import BaseError from './BaseError';

class NotFoundError extends BaseError {
  constructor(message = 'Not found') {
    const statusCode = 404;
    super(statusCode, message);
  }
}

export default NotFoundError;
