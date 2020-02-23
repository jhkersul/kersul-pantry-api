import CreateProduct from '../CreateProduct';
import Product from '../../domain/Product';
import { connectToDatabase, disconnectFromDatabase } from '../../tests/TestDatabase';

describe('Use Case: Create Product', () => {
  let db;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  afterAll(async () => {
    await Product.deleteMany({});
    await disconnectFromDatabase(db);
  });

  describe('When creating with all required params', () => {
    it('returns the created product with ID', async () => {
      const params = {
        name: 'TRIDENT MENTA',
        description: 'Gomas de mascar, sem açúcar',
        barCode: '7622300847723',
        width: 1.0,
        height: 1.0,
        length: 1.0,
        netWeight: 10.0,
        grossWeight: 10.0,
        price: 4.15,
        images: [{ url: 'https://cdn-cosmos.bluesoft.com.br/products/trident-menta_300x300-PU76a48_1.jpg' }],
      };

      const product = await CreateProduct.handle(params);

      expect(product.id).toBeTruthy();
      expect(product.name).toEqual(params.name);
      expect(product.description).toEqual(params.description);
      expect(product.barCode).toEqual(params.barCode);
      expect(product.width).toEqual(params.width);
      expect(product.height).toEqual(params.height);
      expect(product.length).toEqual(params.length);
      expect(product.netWeight).toEqual(params.netWeight);
      expect(product.grossWeight).toEqual(params.grossWeight);
      expect(product.price).toEqual(params.price);
      expect(product.images[0].url).toEqual(params.images[0].url);
    });
  });
});
