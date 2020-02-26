import Joi from '@hapi/joi';
import { validateJoiSchema } from './Validation';

const pantryProductSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  expiryDay: Joi.number().min(1).max(31),
  expiryMonth: Joi.number().min(1).max(12),
  expiryYear: Joi.number().min(2020),
});

/**
 * Validates the request body for create pantry product payload
 * @param {Object} requestBody Request body to validate
 * @returns {Object} Validation object
 */
export function validateCreatePantryProduct(requestBody) {
  return validateJoiSchema(requestBody, pantryProductSchema);
}
