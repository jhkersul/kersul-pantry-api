import Joi from '@hapi/joi';
import { validateJoiSchema } from './Validation';

const shoppingListProductSchema = Joi.object({
  quantity: Joi.number().min(1),
});

/**
 * Validates the request body for update shopping list product payload
 * @param {Object} requestBody Request body to validate
 * @returns {Object} Validation object
 */
export function validateUpdateShoppingListProduct(requestBody) {
  return validateJoiSchema(requestBody, shoppingListProductSchema);
}
