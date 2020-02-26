import request from 'supertest';
import { connectToDatabase, disconnectFromDatabase } from '../../TestDatabase';
import app from '../../../../app';
import MockPantryProduct from '../../mocks/MockPantryProduct';
import MockProduct from '../../mocks/MockProduct';

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

  describe('When deleting a Pantry Product', () => {
    describe('and the ID is valid', () => {
      it('returns 204 with empty body', async () => {
        const savedProduct = await MockProduct.createProduct();
        const pantryProduct = await MockPantryProduct.createPantryProduct(savedProduct.id);

        const response = await request(app)
          .delete(`/pantry-products/${pantryProduct.id}`)
          .set('Accept', 'application/json')
          .expect(204);

        expect(response.body).toEqual({});
      });
    });

    describe('and the Pantry Product does not exist', () => {
      it('returns 404', async () => {
        const nonExistentPantryProduct = '5e522793d8565388c9a3480b';
        const expectedResponse = {
          error: 404,
          message: `PantryProduct with ID ${nonExistentPantryProduct} does not exist`,
        };

        const response = await request(app)
          .delete(`/pantry-products/${nonExistentPantryProduct}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('and the ID is not a valid ObjectId', () => {
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
          .delete(`/pantry-products/${invalidObjectId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422);

        expect(response.body).toEqual(expectedResponse);
      });
    });
  });

  describe('When updating a Pantry Product', () => {
    describe('and the ID is valid', () => {
      describe('and the request body is valid', () => {
        it('returns 200 with empty body', async () => {
          const savedProduct = await MockProduct.createProduct();
          const pantryProduct = await MockPantryProduct.createPantryProduct(savedProduct.id);
          const requestBody = {
            quantity: 123,
          };

          const response = await request(app)
            .patch(`/pantry-products/${pantryProduct.id}`)
            .send(requestBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

          expect(response.body._id).toEqual(pantryProduct.id);
          expect(response.body.quantity).toEqual(requestBody.quantity);
        });
      });

      describe('and the request body is invalid', () => {
        it('returns 422', async () => {
          const savedProduct = await MockProduct.createProduct();
          const pantryProduct = await MockPantryProduct.createPantryProduct(savedProduct.id);
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
            .patch(`/pantry-products/${pantryProduct.id}`)
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
          .patch(`/pantry-products/${invalidObjectId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422);

        expect(response.body).toEqual(expectedResponse);
      });
    });

    describe('and the Pantry Product does not exist', () => {
      it('returns 404', async () => {
        const nonExistentPantryProduct = '5e522793d8565388c9a3480b';
        const expectedResponse = {
          error: 404,
          message: `PantryProduct with ID ${nonExistentPantryProduct} does not exist`,
        };

        const response = await request(app)
          .patch(`/pantry-products/${nonExistentPantryProduct}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body).toEqual(expectedResponse);
      });
    });
  });

  describe('When getting list of products', () => {
    it('returns an array with the list of products', async () => {
      await MockPantryProduct.createPantryProduct();

      const response = await request(app)
        .get('/pantry-products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]._id).toBeTruthy();
      expect(response.body[0].productId).toBeTruthy();
    });
  });
});
