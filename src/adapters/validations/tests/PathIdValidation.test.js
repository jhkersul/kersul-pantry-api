import { validatePathId } from '../PathIdValidation';
import ValidationError from '../../../exceptions/ValidationError';

describe('Validation: Path Id Validation', () => {
  describe('When passing a invalid request body', () => {
    it('throws ValidationError', () => {
      const invalidObjectId = {
        id: 'invalid-obj-id',
      };

      expect(() => validatePathId(invalidObjectId))
        .toThrow(ValidationError);
    });
  });

  describe('When passing a valid request body', () => {
    it('returns the validated request body', () => {
      const validObjectId = {
        id: '5e522793d8565388c9a3480b',
      };

      const validatedObject = validatePathId(validObjectId);

      expect(validatedObject).toEqual(validObjectId);
    });
  });
});
