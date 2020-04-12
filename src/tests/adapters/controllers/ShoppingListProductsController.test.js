import request from 'supertest';
import app from '../../../../app';
import { disconnectFromDatabase, connectToDatabase } from '../../TestDatabase';
import MockProduct from '../../mocks/MockProduct';

describe('Controller: Products Controller', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When creating a Shopping List Product', () => {
    describe('and the request body is valid', () => {
      it('responds with created Shopping List Product', async () => {
        const savedProduct = await MockProduct.createProduct();
        const requestBody = {
          productId: savedProduct.id,
          quantity: 2,
        };
        const expectedResponse = {
          productId: savedProduct.id,
          quantity: 2,
        };

        const response = await request(app)
          .post('/shopping-list-products')
          .send(requestBody)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response.body).toMatchObject(expectedResponse);
      });
    });
  });
});
