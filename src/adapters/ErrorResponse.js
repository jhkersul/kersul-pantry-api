/**
 * Respond JSON error using express res
 * @param {Object} res Express res object
 * @param {Number} statusCode HTTP error code
 * @param {String} message Error message
 */
export function respondError(res, statusCode, message) {
  res.status(statusCode);
  res.json({ error: statusCode, message });
}
