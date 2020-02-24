import randomstring from 'randomstring';
import FindPantryProductSameExpiry from '../FindPantryProductSameExpiry';
import PantryProduct from '../../domain/PantryProduct';
import Product from '../../domain/Product';
import { connectToDatabase, disconnectFromDatabase } from '../../tests/TestDatabase';

describe('Use Case: Find Pantry Product Same Expiry', () => {
  async function createProduct() {
    const product = new Product({
      barCode: randomstring.generate(),
      name: 'Test Product Add Pantry',
    });

    return product.save();
  }

  async function createPantryProduct(product) {
    const pantryProduct = new PantryProduct({
      productId: product.id,
      quantity: 1,
      expiryDay: 1,
      expiryMonth: 1,
      expiryYear: 2023,
    });

    return pantryProduct.save();
  }

  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When there is a Pantry Product with the same expiry date', () => {
    it('returns the saved pantry product', async () => {
      const savedProduct = await createProduct();
      const savedPantryProduct = await createPantryProduct(savedProduct);

      const foundPantryProduct = await FindPantryProductSameExpiry.handle(
        savedProduct.id,
        savedPantryProduct.expiryDay,
        savedPantryProduct.expiryMonth,
        savedPantryProduct.expiryYear,
      );

      expect(foundPantryProduct.id).toEqual(savedPantryProduct.id);
    });
  });
});
