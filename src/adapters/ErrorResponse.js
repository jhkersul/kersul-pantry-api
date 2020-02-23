import BaseError from '../exceptions/BaseError';

/**
 * Respond JSON error using express res
 * @param {Object} res Express res object
 * @param {Number} statusCode HTTP error code
 * @param {String} message Error message
 * @param {Array} details Error details
 */
export function respondError(res, error) {
  const errorToRespond = error instanceof BaseError
    ? error
    : new BaseError(500, error.message);

  res.status(errorToRespond.statusCode);
  res.json({
    error: errorToRespond.statusCode,
    message: errorToRespond.message,
    details: errorToRespond.details,
  });
}
