import request from 'supertest';
import { connectToDatabase, disconnectFromDatabase } from '../../../tests/TestDatabase';
import app from '../../../../app';
import Product from '../../../domain/Product';

describe('Controller: Pantry Products Controller', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When creating a pantry product', () => {
    describe('and the data is invalid', () => {
      it('responds unprocessable entity', async () => {
        const emptyRequestBody = {};
        const expectedResponse = {
          error: 422,
          message: 'Validation error',
          details: [
            {
              target: 'productId',
              message: '"productId" is required',
            },
          ],
        };

        const response = await request(app)
          .post('/pantry-products')
          .send(emptyRequestBody)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422);

        expect(response.body).toMatchObject(expectedResponse);
      });
    });

    describe('and the data is valid', () => {
      it('responds with created pantry product', async () => {
        const product = new Product({
          barCode: '1234-abcd-pantry-test',
          name: 'Test Product Add Pantry',
        });
        const savedProduct = await product.save();
        const requestBody = {
          productId: savedProduct.id,
          quantity: 2,
          expiryDay: 1,
          expiryMonth: 10,
          expiryYear: 2022,
        };
        const expectedResponse = {
          productId: savedProduct.id,
          quantity: 2,
          expiryDay: 1,
          expiryMonth: 10,
          expiryYear: 2022,
        };

        const response = await request(app)
          .post('/pantry-products')
          .send(requestBody)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response.body).toMatchObject(expectedResponse);
      });
    });
  });
});
