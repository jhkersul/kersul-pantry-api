import Joi from '@hapi/joi';
import { validateJoiSchema } from './Validation';

const getPantryProductsSchema = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(1),
});

/**
 * Validates GET Pantry Products query
 * @param {Object} reqQUery The params that will be validated
 * @returns {Object} The validated object result
 */
export function validateGetPantryProducts(reqQuery) {
  return validateJoiSchema(reqQuery, getPantryProductsSchema);
}
