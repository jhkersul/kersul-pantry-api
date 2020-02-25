import { disconnectFromDatabase, connectToDatabase } from '../TestDatabase';
import CreatePantryProduct from '../../use_cases/CreatePantryProduct';
import Product from '../../domain/Product';

describe('Use Case: Create Pantry Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When passing the required params', () => {
    it('creates a new Pantry Product', async () => {
      const product = new Product({
        barCode: '1234-abcd-pantry',
        name: 'Test Product Add Pantry',
      });
      const savedProduct = await product.save();
      const pantryProductParams = {
        productId: savedProduct.id,
        quantity: 2,
        expiryDay: 1,
        expiryMonth: 10,
        expiryYear: 2022,
      };

      const pantryProduct = await CreatePantryProduct.handle(pantryProductParams);

      expect(pantryProduct.id).toBeTruthy();
      expect(pantryProduct.productId.toString()).toEqual(savedProduct.id);
      expect(pantryProduct.quantity).toEqual(pantryProductParams.quantity);
      expect(pantryProduct.expiryDay).toEqual(pantryProductParams.expiryDay);
      expect(pantryProduct.expiryMonth).toEqual(pantryProductParams.expiryMonth);
      expect(pantryProduct.expiryYear).toEqual(pantryProductParams.expiryYear);
    });
  });
});
