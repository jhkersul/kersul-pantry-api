import { connectToDatabase, disconnectFromDatabase } from '../../tests/TestDatabase';
import { mockSuccessGetProductByGtin } from '../../mocks/cosmos/MockBluesoftCosmos';
import GetAndCreateExternalProductByBarCode from '../GetAndCreateExternalProductByBarCode';

describe('Use Case: Get And Create External Product By Bar Code', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When getting a existent external product by bar code', () => {
    it('saves and returns the saved product', async () => {
      const testBarCode = '7622300847791';
      mockSuccessGetProductByGtin(testBarCode);

      const externalProduct = await GetAndCreateExternalProductByBarCode.handle(testBarCode);

      expect(externalProduct.id).toBeTruthy();
      expect(externalProduct.name).toEqual('TRIDENT MENTA');
      expect(externalProduct.barCode).toEqual('7622300847791');
      expect(externalProduct.description).toEqual('Gomas de mascar, sem açúcar');
      expect(externalProduct.width).toEqual(1.0);
      expect(externalProduct.height).toEqual(1.0);
      expect(externalProduct.length).toEqual(1.0);
      expect(externalProduct.netWeight).toEqual(null);
      expect(externalProduct.grossWeight).toEqual(null);
      expect(externalProduct.price).toEqual(4.15);
      expect(externalProduct.images[0].url)
        .toEqual('https://cdn-cosmos.bluesoft.com.br/products/trident-menta_300x300-PU76a48_1.jpg');
    });
  });
});
