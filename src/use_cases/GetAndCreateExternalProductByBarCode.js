import CosmosClient from '../infra/cosmos/CosmosClient';
import Product from '../domain/Product';

function buildProduct(barCode, cosmosProductData) {
  return new Product({
    barCode,
    name: cosmosProductData.description,
    description: cosmosProductData.ncm.description,
    width: cosmosProductData.width,
    height: cosmosProductData.height,
    length: cosmosProductData.length,
    netWeight: cosmosProductData.net_weight,
    grossWeight: cosmosProductData.gross_weight,
    price: cosmosProductData.avg_price,
    images: [{ url: cosmosProductData.thumbnail }],
  });
}

/**
 * Getting and creating product with external api
 * @param {String} barCode String bar code that you want to get
 * @returns {Product} The created product
 */
async function handle(barCode) {
  const cosmosProductData = await CosmosClient.getProductByGtin(barCode);
  const product = buildProduct(barCode, cosmosProductData);

  return product.save();
}

export default {
  handle,
};
