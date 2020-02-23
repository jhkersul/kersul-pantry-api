import { connectToDatabase, disconnectFromDatabase } from '../../tests/TestDatabase';
import Product from '../../domain/Product';
import GetProductByBarCode from '../GetProductByBarCode';
import GetAndCreateExternalProductByBarCode from '../GetAndCreateExternalProductByBarCode';

jest.mock('../GetAndCreateExternalProductByBarCode');

describe('Use Case: Get Product By Bar Code', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When passing a valid bar code', () => {
    describe('and product already on database', () => {
      it('returns the saved product', async () => {
        const testBarCode = 'abc1234';
        const product = new Product({
          barCode: testBarCode,
          name: 'Test Product',
        });
        const savedProduct = await product.save();

        const gotProduct = await GetProductByBarCode.handle(testBarCode);

        expect(gotProduct.id).toEqual(savedProduct.id);
        expect(gotProduct.barCode).toEqual(savedProduct.barCode);
      });
    });

    describe('and product does not exist on database', () => {
      it('calls get external product use case', async () => {
        const testBarCode = 'external-123-test';
        const externalProduct = new Product({
          barCode: testBarCode,
          name: 'Test External Product',
        });
        GetAndCreateExternalProductByBarCode.handle
          .mockImplementation(async () => externalProduct);

        const gotProduct = await GetProductByBarCode.handle(testBarCode);

        expect(gotProduct.barCode).toEqual(externalProduct.barCode);
      });

      describe('and product does not exist on external api', () => {
        it('throws error with not found message', async () => {
          const testBarCode = 'external-123-test';
          GetAndCreateExternalProductByBarCode.handle
            .mockImplementation(async () => {
              throw new Error('Not found');
            });

          expect(GetProductByBarCode.handle(testBarCode))
            .rejects.toThrow('Product not found on external API');
        });
      });
    });
  });
});
