import request from 'supertest';
import { connectToDatabase, disconnectFromDatabase } from '../../TestDatabase';
import app from '../../../../app';
import MockPantryProduct from '../../mocks/MockPantryProduct';
import MockProduct from '../../mocks/MockProduct';

describe('Controller: Delete Pantry Product Controller', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
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
});
