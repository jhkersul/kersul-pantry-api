import { validateUpdatePantryProduct } from '../../../adapters/validations/UpdatePantryProductValidation';
import ValidationError from '../../../exceptions/ValidationError';

describe('Validation: Update Pantry Product Validation', () => {
  describe('When passing a invalid request body', () => {
    it('throws ValidationError', () => {
      const invalidRequestBody = {
        qt: 10,
      };

      expect(() => validateUpdatePantryProduct(invalidRequestBody))
        .toThrow(ValidationError);
    });
  });

  describe('When passing a valid request body', () => {
    it('returns the validated request body', () => {
      const validRequestBody = {
        quantity: 2,
        expiryDay: 2,
        expiryMonth: 2,
        expiryYear: 2020,
      };

      const validatedObject = validateUpdatePantryProduct(validRequestBody);

      expect(validatedObject).toEqual(validRequestBody);
    });
  });
});
