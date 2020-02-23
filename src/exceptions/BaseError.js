class BaseError extends Error {
  constructor(statusCode = 500, message = 'Unknown error', details = undefined) {
    super(message, statusCode, details);

    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export default BaseError;
