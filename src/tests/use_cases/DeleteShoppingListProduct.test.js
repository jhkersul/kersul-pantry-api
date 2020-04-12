import { connectToDatabase, disconnectFromDatabase } from '../TestDatabase';
import MockShoppingListProduct from '../mocks/MockShoppingListProduct';
import MockProduct from '../mocks/MockProduct';
import DeleteShoppingListProduct from '../../use_cases/DeleteShoppingListProduct';
import ShoppingListProduct from '../../domain/ShoppingListProduct';
import NotFoundError from '../../exceptions/NotFoundError';

describe('Use Case: Delete Shopping List Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When deleting Shopping List Product', () => {
    test('Shopping List product can not be found anymore', async () => {
      const product = await MockProduct.createProduct();
      const shoppingListProduct = await MockShoppingListProduct
        .createShoppingListProduct(product.id);

      await DeleteShoppingListProduct.handle(shoppingListProduct.id);
      const foundShoppingListProduct = await ShoppingListProduct.findById(shoppingListProduct.id);

      expect(foundShoppingListProduct).toBeNull();
    });
  });

  describe('When deleting a Shopping List Product that does not exist', () => {
    test('throws NotFoundError', async () => {
      const nonExistentShoppingListProduct = '5e522793d8565388c9a3480b';

      await expect(DeleteShoppingListProduct.handle(nonExistentShoppingListProduct))
        .rejects.toThrow(NotFoundError);
    });
  });
});
