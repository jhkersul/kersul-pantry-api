import Product from '../domain/Product';

async function handle(productParams) {
  const product = new Product(productParams);

  return product.save();
}

export default {
  handle,
};
