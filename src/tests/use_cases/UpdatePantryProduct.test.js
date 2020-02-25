import MockPantryProduct from '../mocks/MockPantryProduct';
import MockProduct from '../mocks/MockProduct';
import UpdatePantryProduct from '../../use_cases/UpdatePantryProduct';
import { connectToDatabase, disconnectFromDatabase } from '../TestDatabase';
import ValidationError from '../../exceptions/ValidationError';

describe('Use Case: Update Pantry Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When updating with correct params', () => {
    it('returns the updated pantry product', async () => {
      const product = await MockProduct.createProduct();
      const pantryProduct = await MockPantryProduct.createPantryProduct(product.id, 10);
      const updateParams = {
        quantity: 3,
      };

      const updatedPantryProduct = await UpdatePantryProduct
        .handle(pantryProduct.id, updateParams);

      expect(updatedPantryProduct.id).toEqual(pantryProduct.id);
      expect(updatedPantryProduct.quantity).toEqual(updateParams.quantity);
      expect(updatedPantryProduct.expiryDay).toEqual(pantryProduct.expiryDay);
      expect(updatedPantryProduct.expiryMonth).toEqual(pantryProduct.expiryMonth);
      expect(updatedPantryProduct.expiryYear).toEqual(pantryProduct.expiryYear);
    });

    describe('but not modifiying anything', () => {
      it('returns the same pantry product', async () => {
        const product = await MockProduct.createProduct();
        const pantryProduct = await MockPantryProduct.createPantryProduct(product.id);
        const updateParams = {
          quantity: pantryProduct.quantity,
        };

        const updatedPantryProduct = await UpdatePantryProduct
          .handle(pantryProduct.id, updateParams);

        expect(updatedPantryProduct.id).toEqual(pantryProduct.id);
        expect(updatedPantryProduct.quantity).toEqual(pantryProduct.quantity);
        expect(updatedPantryProduct.expiryDay).toEqual(pantryProduct.expiryDay);
        expect(updatedPantryProduct.expiryMonth).toEqual(pantryProduct.expiryMonth);
        expect(updatedPantryProduct.expiryYear).toEqual(pantryProduct.expiryYear);
      });
    });
  });

  describe('When updating with incorrect params', () => {
    it('throws error', async () => {
      const product = await MockProduct.createProduct();
      const pantryProduct = await MockPantryProduct.createPantryProduct(product.id);
      const updateParams = {
        quantity: -3,
      };

      await expect(UpdatePantryProduct.handle(pantryProduct.id, updateParams))
        .rejects.toThrow(ValidationError);
    });
  });

  describe('When updating a non existent pantry product id', () => {
    it('throws error', async () => {
      const nonExistentPantryProduct = '5e522793d8565388c9a3480b';
      const updateParams = {
        quantity: 1,
      };

      await expect(UpdatePantryProduct.handle(nonExistentPantryProduct, updateParams))
        .rejects.toThrow('Invalid Pantry Product ID');
    });
  });
});
