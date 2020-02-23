import request from 'supertest';
import app from '../../../../app';
import { mockSuccessGetProductByGtin, mockFailedGetProductByGtin } from '../../../mocks/cosmos/MockBluesoftCosmos';
import { disconnectFromDatabase, connectToDatabase } from '../../../tests/TestDatabase';

describe('Controller: Products Controller', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When getting a product', () => {
    describe('and the barCode is valid', () => {
      const successBarCode = 'success-bar-code';

      beforeAll(() => {
        mockSuccessGetProductByGtin(successBarCode);
      });

      it('responds the product found', async () => {
        const expectedResponse = {
          name: 'TRIDENT MENTA',
          description: 'Gomas de mascar, sem açúcar',
          barCode: successBarCode,
          width: 1.0,
          height: 1.0,
          length: 1.0,
          netWeight: null,
          grossWeight: null,
          price: 4.15,
          images: [{
            url: 'https://cdn-cosmos.bluesoft.com.br/products/trident-menta_300x300-PU76a48_1.jpg',
          }],
        };

        const response = await request(app)
          .get(`/products/${successBarCode}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject(expectedResponse);
      });
    });

    describe('and the barCode is invalid', () => {
      const invalidBarCode = 'invalid-bar-code';

      beforeAll(() => {
        mockFailedGetProductByGtin(invalidBarCode);
      });

      it('responds 404', async () => {
        const expectedResponse = {
          error: 404,
          message: 'Product not found on external API',
        };

        const response = await request(app)
          .get(`/products/${invalidBarCode}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body).toMatchObject(expectedResponse);
      });
    });
  });
});
