import { connectToDatabase, disconnectFromDatabase } from '../TestDatabase';
import MockPantryProduct from '../mocks/MockPantryProduct';
import GetPantryProducts from '../../use_cases/GetPantryProducts';

describe('Use Case: Get Pantry Products', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When passing a limit', () => {
    it('gets only the limit', async () => {
      await MockPantryProduct.createPantryProduct();
      await MockPantryProduct.createPantryProduct();

      const productsList = await GetPantryProducts.handle(0, 1);

      expect(productsList).toHaveLength(1);
    });
  });

  describe('When passing a offset', () => {
    it('gets exactly the offset pantry product', async () => {
      await MockPantryProduct.createPantryProduct();
      await MockPantryProduct.createPantryProduct();

      const productsListWithoutOffset = await GetPantryProducts.handle(0, 2);
      const productsListWithOffset = await GetPantryProducts.handle(1, 1);

      expect(productsListWithOffset[0].id)
        .toEqual(productsListWithoutOffset[1].id);
    });
  });
});
