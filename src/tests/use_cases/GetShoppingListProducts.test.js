import { connectToDatabase, disconnectFromDatabase } from '../TestDatabase';
import MockShoppingListProduct from '../mocks/MockShoppingListProduct';
import GetShoppingListProducts from '../../use_cases/GetShoppingListProducts';

describe('Use Case: Get Shopping List Products', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When passing a limit', () => {
    it('gets only the limit', async () => {
      await MockShoppingListProduct.createShoppingListProduct();
      await MockShoppingListProduct.createShoppingListProduct();

      const productsList = await GetShoppingListProducts.handle(0, 1);

      expect(productsList).toHaveLength(1);
    });
  });

  describe('When passing a offset', () => {
    it('gets exactly the offset shopping list product', async () => {
      await MockShoppingListProduct.createShoppingListProduct();
      await MockShoppingListProduct.createShoppingListProduct();

      const productsListWithoutOffset = await GetShoppingListProducts.handle(0, 2);
      const productsListWithOffset = await GetShoppingListProducts.handle(1, 1);

      expect(productsListWithOffset[0].id)
        .toEqual(productsListWithoutOffset[1].id);
    });
  });
});
