import Joi from '@hapi/joi';
import JoiObjectId from 'joi-objectid';
import { validateJoiSchema } from './Validation';

Joi.objectId = JoiObjectId(Joi);

const pathIdSchema = Joi.object({
  id: Joi.objectId(),
});

export function validatePathId(reqParams) {
  return validateJoiSchema(reqParams, pathIdSchema);
}
