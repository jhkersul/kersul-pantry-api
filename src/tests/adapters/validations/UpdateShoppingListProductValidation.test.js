import { validateUpdateShoppingListProduct } from '../../../adapters/validations/UpdateShoppingListProductValidation';
import ValidationError from '../../../exceptions/ValidationError';

describe('Validation: Update Shopping Product Validation', () => {
  describe('When passing a invalid request body', () => {
    it('throws ValidationError', () => {
      const invalidRequestBody = {
        qt: 10,
      };

      expect(() => validateUpdateShoppingListProduct(invalidRequestBody))
        .toThrow(ValidationError);
    });
  });

  describe('When passing a valid request body', () => {
    it('returns the validated request body', () => {
      const validRequestBody = {
        quantity: 2,
      };

      const validatedObject = validateUpdateShoppingListProduct(validRequestBody);

      expect(validatedObject).toEqual(validRequestBody);
    });
  });
});
