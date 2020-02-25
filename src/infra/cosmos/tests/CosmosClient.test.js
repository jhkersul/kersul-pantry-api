import CosmosClient from '../CosmosClient';
import {
  mockSuccessGetProductByGtin,
  mockFailedGetProductByGtin,
} from '../../../mocks/cosmos/MockBluesoftCosmos';

describe('Infra: Cosmos Client', () => {
  describe('When getting product with a valid GTIN', () => {
    test('returns the product when passing a valid gtin', async () => {
      const gtin = '7622300847791';
      mockSuccessGetProductByGtin(gtin);

      const product = await CosmosClient.getProductByGtin(gtin);

      expect(product.description).toEqual('TRIDENT MENTA');
      expect(product.gtin).toEqual(7622300847791);
    });
  });

  describe('When getting product with a invalid GTIN', () => {
    test('returns the product when passing a valid gtin', async () => {
      const invalidGtin = 'abcd1234';
      mockFailedGetProductByGtin(invalidGtin);

      await expect(CosmosClient.getProductByGtin(invalidGtin))
        .rejects.toThrow('Product not found');
    });
  });
});
