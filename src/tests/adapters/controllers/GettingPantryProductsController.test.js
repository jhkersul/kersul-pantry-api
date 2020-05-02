import request from 'supertest';
import { connectToDatabase, disconnectFromDatabase } from '../../TestDatabase';
import app from '../../../../app';
import MockPantryProduct from '../../mocks/MockPantryProduct';

describe('Controller: Getting Pantry Products Controller', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
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
