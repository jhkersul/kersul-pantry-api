import { respondError } from '../ErrorResponse';
import BaseError from '../../exceptions/BaseError';

describe('Adapters: ErrorResponse', () => {
  describe('When responding an error', () => {
    test('calls express res with status code and message', () => {
      const fakeRes = { status: jest.fn(), json: jest.fn() };
      const statusCode = 404;
      const message = 'Not Found';
      const error = new BaseError(statusCode, message);

      respondError(fakeRes, error);

      expect(fakeRes.status).toBeCalledWith(statusCode);
      expect(fakeRes.json).toBeCalledWith({ error: statusCode, message });
    });
  });
});
