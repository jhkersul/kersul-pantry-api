import Joi from '@hapi/joi';
import { validateJoiSchema } from './Validation';

const pantryProductSchema = Joi.object({
  quantity: Joi.number().min(1),
  expiryDay: Joi.number().min(1).max(31),
  expiryMonth: Joi.number().min(1).max(12),
  expiryYear: Joi.number().min(2020),
});

/**
 * Validates the request body for update pantry product payload
 * @param {Object} requestBody Request body to validate
 * @returns {Object} Validation object
 */
export function validateUpdatePantryProduct(requestBody) {
  return validateJoiSchema(requestBody, pantryProductSchema);
}
