import request from 'supertest';
import app from '../../../../app';
import { disconnectFromDatabase, connectToDatabase } from '../../TestDatabase';
import MockProduct from '../../mocks/MockProduct';
import MockShoppingListProduct from '../../mocks/MockShoppingListProduct';

describe('Controller: Delete Shopping List Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When deleting a Shopping List Product', () => {
    describe('and the ID is valid', () => {
      it('returns 204 with empty body', async () => {
        const savedProduct = await MockProduct.createProduct();
        const shoppingListProduct = await MockShoppingListProduct
          .createShoppingListProduct(savedProduct.id);

        const response = await request(app)
          .delete(`/shopping-list-products/${shoppingListProduct.id}`)
          .set('Accept', 'application/json')
          .expect(204);

        expect(response.body).toEqual({});
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
          .delete(`/shopping-list-products/${nonExistentShoppingListProduct}`)
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
          .delete(`/shopping-list-products/${invalidObjectId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422);

        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
});
