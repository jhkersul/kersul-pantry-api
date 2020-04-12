import { validateCreateShoppingListProduct } from '../../../adapters/validations/CreateShoppingListProductValidation';
import ValidationError from '../../../exceptions/ValidationError';

describe('Validation: Create Shopping List Product Validation', () => {
  describe('When passing a invalid request body', () => {
    it('throws ValidationError', () => {
      const invalidRequestBody = {
        qt: 10,
      };

      expect(() => validateCreateShoppingListProduct(invalidRequestBody))
        .toThrow(ValidationError);
    });
  });

  describe('When passing a valid request body', () => {
    it('returns the validated request body', () => {
      const validRequestBody = {
        productId: '8c4eb1c4d9987eecb9e563a8142',
        quantity: 2,
      };

      const validatedObject = validateCreateShoppingListProduct(validRequestBody);

      expect(validatedObject).toEqual(validRequestBody);
    });
  });
});
