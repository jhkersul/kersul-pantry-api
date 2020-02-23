import Product from '../domain/Product';

/**
 * Creates a product on database
 * @param {Object} productParams Params required to create a product
 * @returns {Product} Created product
 */
async function handle(productParams) {
  const product = new Product(productParams);

  return product.save();
}

export default {
  handle,
};
