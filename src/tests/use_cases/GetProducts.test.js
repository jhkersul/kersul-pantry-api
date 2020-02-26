import { connectToDatabase, disconnectFromDatabase } from '../TestDatabase';
import MockProduct from '../mocks/MockProduct';
import GetProducts from '../../use_cases/GetProducts';

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
      await MockProduct.createProduct();
      await MockProduct.createProduct();

      const productsList = await GetProducts.handle(0, 1);

      expect(productsList).toHaveLength(1);
    });
  });

  describe('When passing a offset', () => {
    it('gets exactly the offset product', async () => {
      await MockProduct.createProduct();
      await MockProduct.createProduct();

      const productsListWithoutOffset = await GetProducts.handle(0, 2);
      const productsListWithOffset = await GetProducts.handle(1, 1);

      expect(productsListWithOffset[0].id)
        .toEqual(productsListWithoutOffset[1].id);
    });
  });
});
