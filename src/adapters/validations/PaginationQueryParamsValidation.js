import Joi from '@hapi/joi';
import { validateJoiSchema } from './Validation';

const paginationQueryParamsSchema = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(1),
});

/**
 * Validates query params for pagination
 * @param {Object} reqQUery The params that will be validated
 * @returns {Object} The validated object result
 */
export function validatePaginationQueryParams(reqQuery) {
  return validateJoiSchema(reqQuery, paginationQueryParamsSchema);
}
