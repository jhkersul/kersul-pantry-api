import MockShoppingListProduct from '../mocks/MockShoppingListProduct';
import MockProduct from '../mocks/MockProduct';
import UpdateShoppingListProduct from '../../use_cases/UpdateShoppingListProduct';
import { connectToDatabase, disconnectFromDatabase } from '../TestDatabase';
import ValidationError from '../../exceptions/ValidationError';

describe('Use Case: Update Shopping List Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When updating with correct params', () => {
    it('returns the updated shopping list product', async () => {
      const product = await MockProduct.createProduct();
      const shoppingListProduct = await MockShoppingListProduct
        .createShoppingListProduct(product.id, 10);
      const updateParams = {
        quantity: 3,
      };

      const updatedShoppingListProduct = await UpdateShoppingListProduct
        .handle(shoppingListProduct.id, updateParams);

      expect(updatedShoppingListProduct.id).toEqual(shoppingListProduct.id);
      expect(updatedShoppingListProduct.quantity).toEqual(updateParams.quantity);
    });

    describe('but not modifiying anything', () => {
      it('returns the same shopping list product', async () => {
        const product = await MockProduct.createProduct();
        const shoppingListProduct = await MockShoppingListProduct
          .createShoppingListProduct(product.id);
        const updateParams = {
          quantity: shoppingListProduct.quantity,
        };

        const updatedShoppingListProduct = await UpdateShoppingListProduct
          .handle(shoppingListProduct.id, updateParams);

        expect(updatedShoppingListProduct.id).toEqual(shoppingListProduct.id);
        expect(updatedShoppingListProduct.quantity).toEqual(shoppingListProduct.quantity);
      });
    });
  });

  describe('When updating with incorrect params', () => {
    it('throws ValidationError', async () => {
      const product = await MockProduct.createProduct();
      const shoppingListProduct = await MockShoppingListProduct
        .createShoppingListProduct(product.id);
      const updateParams = {
        quantity: -3,
      };

      await expect(UpdateShoppingListProduct.handle(shoppingListProduct.id, updateParams))
        .rejects.toThrow(ValidationError);
    });
  });

  describe('When updating a non existent shopping list product id', () => {
    it('throws NotFoundError', async () => {
      const nonExistentShoppingListProduct = '5e522793d8565388c9a3480b';
      const updateParams = {
        quantity: 1,
      };

      await expect(UpdateShoppingListProduct.handle(nonExistentShoppingListProduct, updateParams))
        .rejects.toThrow(`Shopping List Product with ID ${nonExistentShoppingListProduct} does not exist`);
    });
  });
});
