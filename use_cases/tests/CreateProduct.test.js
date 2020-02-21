import mongoose from 'mongoose';
import CreateProduct from '../CreateProduct';
import Product from '../../domain/Product';

describe('Use Case: Create Product', () => {
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await Product.deleteMany({});
    await db.disconnect();
  });

  describe('When creating with all required params', () => {
    it('returns the created product with ID', async () => {
      const params = {
        name: 'TRIDENT MENTA',
        description: 'Gomas de mascar, sem açúcar',
        barCode: 7622300847791,
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
    });
  });
});
