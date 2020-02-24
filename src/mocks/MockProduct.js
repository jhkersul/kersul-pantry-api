import randomstring from 'randomstring';
import Product from '../domain/Product';

async function createProduct(
  barCode = randomstring.generate(),
  name = 'Test Product Add Pantry',
) {
  const product = new Product({
    barCode,
    name,
  });

  return product.save();
}

export default {
  createProduct,
};
