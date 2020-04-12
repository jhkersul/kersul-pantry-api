import request from 'supertest';
import app from '../../../../app';
import { disconnectFromDatabase, connectToDatabase } from '../../TestDatabase';
import MockProduct from '../../mocks/MockProduct';
import MockShoppingListProduct from '../../mocks/MockShoppingListProduct';

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

  describe('When getting list of shopping list products', () => {
    it('returns an array with the list of products', async () => {
      await MockShoppingListProduct.createShoppingListProduct();

      const response = await request(app)
        .get('/shopping-list-products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]._id).toBeTruthy();
      expect(response.body[0].productId).toBeTruthy();
    });
  });

  describe('When updating a Shopping List Product', () => {
    describe('and the ID is valid', () => {
      describe('and the request body is valid', () => {
        it('returns 200 with empty body', async () => {
          const savedProduct = await MockProduct.createProduct();
          const shoppingListProduct = await MockShoppingListProduct
            .createShoppingListProduct(savedProduct.id);
          const requestBody = {
            quantity: 123,
          };

          const response = await request(app)
            .patch(`/shopping-list-products/${shoppingListProduct.id}`)
            .send(requestBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

          expect(response.body._id).toEqual(shoppingListProduct.id);
          expect(response.body.quantity).toEqual(requestBody.quantity);
        });
      });

      describe('and the request body is invalid', () => {
        it('returns 422', async () => {
          const savedProduct = await MockProduct.createProduct();
          const shoppingListProduct = await MockShoppingListProduct
            .createShoppingListProduct(savedProduct.id);
          const requestBody = {
            quantity: -20,
          };
          const expectedResponse = {
            error: 422,
            message: 'Validation error',
            details: [
              {
                target: 'quantity',
                message: '"quantity" must be larger than or equal to 1',
              },
            ],
          };

          const response = await request(app)
            .patch(`/shopping-list-products/${shoppingListProduct.id}`)
            .send(requestBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);

          expect(response.body).toEqual(expectedResponse);
        });
      });
    });

    describe('and the ID is invalid', () => {
      it('returns 422', async () => {
        const invalidObjectId = 'invalid-obj-id';
        const expectedResponse = {
          error: 422,
          message: 'Validation error',
          details: [
            {
              target: 'id',
              message: '"id" with value "invalid-obj-id" fails to match the valid mongo id pattern',
            },
          ],
        };

        const response = await request(app)
          .patch(`/shopping-list-products/${invalidObjectId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422);

        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('and the Shopping List Product does not exist', () => {
      it('returns 404', async () => {
        const nonExistentShoppingListProduct = '5e522793d8565388c9a3480b';
        const expectedResponse = {
          error: 404,
          message: `Shopping List Product with ID ${nonExistentShoppingListProduct} does not exist`,
        };

        const response = await request(app)
          .patch(`/shopping-list-products/${nonExistentShoppingListProduct}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
});
