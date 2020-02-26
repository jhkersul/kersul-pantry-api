import { disconnectFromDatabase, connectToDatabase } from '../TestDatabase';
import CreateShoppingListProduct from '../../use_cases/CreateShoppingListProduct';
import MockProduct from '../mocks/MockProduct';

describe('Use Case: Create Pantry Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase(db);
  });

  describe('When passing the required params', () => {
    it('creates a new Shopping List Product', async () => {
      const product = await MockProduct.createProduct();
      const shoppingListProductParams = {
        productId: product.id,
        quantity: 2,
      };

      const shoppingListProduct = await CreateShoppingListProduct
        .handle(shoppingListProductParams);

      expect(shoppingListProduct.id).toBeTruthy();
      expect(shoppingListProduct.productId.toString()).toEqual(product.id);
      expect(shoppingListProduct.quantity).toEqual(shoppingListProductParams.quantity);
    });
  });
});
