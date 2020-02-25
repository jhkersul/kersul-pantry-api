/**
 * Transform Joi error to error details format
 * @param {Object} error Joi error object
 * @returns {Array} Error details. Ex: [{ target: 'abc', message: 'cde' }]
 */
export function transformJoiToErrorDetails(error) {
  return error.details.map((errorDetail) => ({
    target: errorDetail.path.join('.'),
    message: errorDetail.message,
  }));
}
