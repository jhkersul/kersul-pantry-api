import request from 'supertest';
import { connectToDatabase, disconnectFromDatabase } from '../../TestDatabase';
import app from '../../../../app';
import MockPantryProduct from '../../mocks/MockPantryProduct';
import MockProduct from '../../mocks/MockProduct';

describe('Controller: Create Pantry Product', () => {
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
        const savedProduct = await MockProduct.createProduct();
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

      describe('and already exist a pantry product with the same productId and expiry date', () => {
        it('returns a quantity updated pantry product', async () => {
          const savedProduct = await MockProduct.createProduct();
          const pantryProduct = await MockPantryProduct.createPantryProduct(savedProduct.id);

          const requestBody = {
            productId: savedProduct.id,
            quantity: 3,
            expiryDay: pantryProduct.expiryDay,
            expiryMonth: pantryProduct.expiryMonth,
            expiryYear: pantryProduct.expiryYear,
          };
          const expectedResponse = {
            _id: pantryProduct.id,
            productId: savedProduct.id,
            quantity: requestBody.quantity + pantryProduct.quantity,
            expiryDay: pantryProduct.expiryDay,
            expiryMonth: pantryProduct.expiryMonth,
            expiryYear: pantryProduct.expiryYear,
          };

          const response = await request(app)
            .post('/pantry-products')
            .send(requestBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

          expect(response.body).toMatchObject(expectedResponse);
        });
      });
    });
  });
});
