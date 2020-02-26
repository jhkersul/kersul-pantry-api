import Joi from '@hapi/joi';
import { validateJoiSchema } from './Validation';

const getPantryProductsSchema = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(1),
});

export function validateGetPantryProducts(reqParams) {
  return validateJoiSchema(reqParams, getPantryProductsSchema);
}
