import request from 'supertest';
import app from '../../../../app';
import { disconnectFromDatabase, connectToDatabase } from '../../TestDatabase';
import MockProduct from '../../mocks/MockProduct';
import MockShoppingListProduct from '../../mocks/MockShoppingListProduct';

describe('Controller: Create Shopping List Product', () => {
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

      describe('and already exist a shopping list product with the same productId', () => {
        it('returns a quantity updated shopping list product', async () => {
          const savedProduct = await MockProduct.createProduct();
          const shoppingListProduct = await MockShoppingListProduct
            .createShoppingListProduct(savedProduct.id);
          const requestBody = {
            productId: savedProduct.id,
            quantity: 3,
          };
          const expectedResponse = {
            _id: shoppingListProduct.id,
            productId: savedProduct.id,
            quantity: requestBody.quantity + shoppingListProduct.quantity,
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

    describe('and the request body is invalid', () => {
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
          .post('/shopping-list-products')
          .send(emptyRequestBody)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422);

        expect(response.body).toMatchObject(expectedResponse);
      });
    });
  });
});
