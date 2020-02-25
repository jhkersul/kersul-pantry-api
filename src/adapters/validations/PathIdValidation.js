import Joi from '@hapi/joi';
import JoiObjectId from 'joi-objectid';
import { transformJoiToErrorDetails } from './JoiTransform';
import ValidationError from '../../exceptions/ValidationError';

Joi.objectId = JoiObjectId(Joi);

const pathIdValidation = Joi.object({
  id: Joi.objectId(),
});

export function validatePathId(reqParams) {
  const validation = pathIdValidation.validate(reqParams);
  if (validation.error) {
    const errorDetails = transformJoiToErrorDetails(validation.error);
    throw new ValidationError(errorDetails);
  }

  return validation.value;
}
