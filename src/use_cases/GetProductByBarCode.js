import Product from '../domain/Product';
import GetAndCreateExternalProductByBarCode from './GetAndCreateExternalProductByBarCode';
import NotFoundError from '../exceptions/NotFoundError';

async function getProductOnDatabase(barCode) {
  try {
    const product = await Product.findOne({ barCode });
    return product;
  } catch (error) {
    return null;
  }
}

async function getExternalProduct(barCode) {
  try {
    const externalProduct = await GetAndCreateExternalProductByBarCode.handle(barCode);
    return externalProduct;
  } catch (error) {
    throw new NotFoundError('Product not found on external API');
  }
}

/**
 * Gets product by bar code
 * @param {String} barCode Bar code to get product from
 * @returns {Product} Found product
 */
async function handle(barCode) {
  const productOnDb = await getProductOnDatabase(barCode);
  if (productOnDb) return productOnDb;

  return getExternalProduct(barCode);
}

export default {
  handle,
};
