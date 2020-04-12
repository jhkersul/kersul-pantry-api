import Joi from '@hapi/joi';
import { validateJoiSchema } from './Validation';

const pantryProductSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

/**
 * Validates the request body for create pantry product payload
 * @param {Object} requestBody Request body to validate
 * @returns {Object} Validation object
 */
export function validateCreateShoppingListProduct(requestBody) {
  return validateJoiSchema(requestBody, pantryProductSchema);
}
