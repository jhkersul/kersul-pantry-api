import ValidationError from '../../../exceptions/ValidationError';
import { validateGetPantryProducts } from '../../../adapters/validations/GetPantryProductsValidation';

describe('Validation: Get Pantry Products Validation', () => {
  describe('When passing a invalid request body', () => {
    it('throws ValidationError', () => {
      const invalidReqParams = {
        offset: -10,
      };

      expect(() => validateGetPantryProducts(invalidReqParams))
        .toThrow(ValidationError);
    });
  });

  describe('When passing a valid request body', () => {
    it('returns the validated request body', () => {
      const validReqParams = {
        offset: 10,
        limit: 4,
      };

      const validatedObject = validateGetPantryProducts(validReqParams);

      expect(validatedObject).toEqual(validReqParams);
    });
  });
});
