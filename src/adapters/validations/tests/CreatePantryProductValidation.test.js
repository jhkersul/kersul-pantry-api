import { validateCreatePantryProduct } from '../CreatePantryProductValidation';
import ValidationError from '../../../exceptions/ValidationError';

describe('Validation: Create Pantry Product Validation', () => {
  describe('When passing a invalid request body', () => {
    it('throws ValidationError', () => {
      const invalidRequestBody = {
        qt: 10,
      };

      expect(() => validateCreatePantryProduct(invalidRequestBody))
        .toThrow(ValidationError);
    });
  });

  describe('When passing a valid request body', () => {
    it('returns the validated request body', () => {
      const validRequestBody = {
        productId: '8c4eb1c4d9987eecb9e563a8142',
        quantity: 2,
        expiryDay: 2,
        expiryMonth: 2,
        expiryYear: 2020,
      };

      const validatedObject = validateCreatePantryProduct(validRequestBody);

      expect(validatedObject).toEqual(validRequestBody);
    });
  });
});
