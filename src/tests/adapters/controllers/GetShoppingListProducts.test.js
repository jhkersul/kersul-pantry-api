import request from 'supertest';
import app from '../../../../app';
import { disconnectFromDatabase, connectToDatabase } from '../../TestDatabase';
import MockShoppingListProduct from '../../mocks/MockShoppingListProduct';

describe('Controller: Get Shopping List Products', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
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
});
