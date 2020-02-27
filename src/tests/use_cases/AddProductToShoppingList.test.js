import { disconnectFromDatabase, connectToDatabase } from '../TestDatabase';
import AddProductToShoppingList from '../../use_cases/AddProductToShoppingList';
import MockProduct from '../mocks/MockProduct';

describe('Use Case: Add Product To Shopping List', () => {
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

      const shoppingListProduct = await AddProductToShoppingList
        .handle(shoppingListProductParams);

      expect(shoppingListProduct.id).toBeTruthy();
      expect(shoppingListProduct.productId.toString()).toEqual(product.id);
      expect(shoppingListProduct.quantity).toEqual(shoppingListProductParams.quantity);
    });
  });
});
