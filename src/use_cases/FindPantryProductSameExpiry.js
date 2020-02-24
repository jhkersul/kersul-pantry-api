import PantryProduct from '../domain/PantryProduct';

/**
 * Finds by a pantry product with same expiry date and product id
 * @param {ObjectId} productId Product id
 * @param {Number} expiryDay Pantry Product Expiry Day
 * @param {Number} expiryMonth Pantry Product Expiry Month
 * @param {Number} expiryYear Pantry Product Expiry Year
 */
async function handle(productId, expiryDay, expiryMonth, expiryYear) {
  try {
    const pantryProduct = await PantryProduct.findOne({
      productId,
      expiryDay,
      expiryMonth,
      expiryYear,
    });

    return pantryProduct;
  } catch (error) {
    return null;
  }
}

export default {
  handle,
};
