import { connectToDatabase, disconnectFromDatabase } from '../TestDatabase';
import MockPantryProduct from '../mocks/MockPantryProduct';
import MockProduct from '../mocks/MockProduct';
import DeletePantryProduct from '../../use_cases/DeletePantryProduct';
import PantryProduct from '../../domain/PantryProduct';
import NotFoundError from '../../exceptions/NotFoundError';

describe('Use Case: Delete Pantry Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When deleting Pantry Product', () => {
    test('Pantry product can not be found anymore', async () => {
      const product = await MockProduct.createProduct();
      const pantryProduct = await MockPantryProduct.createPantryProduct(product.id);

      await DeletePantryProduct.handle(pantryProduct.id);
      const foundPantryProduct = await PantryProduct.findById(pantryProduct.id);

      expect(foundPantryProduct).toBeNull();
    });
  });

  describe('When deleting a Pantry Product that does not exist', () => {
    test('throws NotFoundError', async () => {
      const nonExistentPantryProduct = '5e522793d8565388c9a3480b';

      await expect(DeletePantryProduct.handle(nonExistentPantryProduct))
        .rejects.toThrow(NotFoundError);
    });
  });
});
