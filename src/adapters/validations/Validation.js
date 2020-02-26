import { transformJoiToErrorDetails } from './JoiTransform';
import ValidationError from '../../exceptions/ValidationError';

export function validateJoiSchema(objectToValidate, joiSchema) {
  const validation = joiSchema.validate(objectToValidate);
  if (validation.error) {
    const errorDetails = transformJoiToErrorDetails(validation.error);
    throw new ValidationError(errorDetails);
  }

  return validation.value;
}
