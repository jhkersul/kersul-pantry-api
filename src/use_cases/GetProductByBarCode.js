import Product from '../domain/Product';
import GetAndCreateExternalProductByBarCode from './GetAndCreateExternalProductByBarCode';

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
    throw new Error('Product not found on external API');
  }
}

async function handle(barCode) {
  const productOnDb = await getProductOnDatabase(barCode);
  if (productOnDb) return productOnDb;

  return getExternalProduct(barCode);
}

export default {
  handle,
};
