import ShoppingListProduct from '../domain/ShoppingListProduct';
import ValidationError from '../exceptions/ValidationError';
import NotFoundError from '../exceptions/NotFoundError';
import BaseError from '../exceptions/BaseError';

/**
 * Updates a Shopping List Product
 * @param {ObjectId} shoppingListProductId ID of Shopping List Product to update
 * @param {Object} patchParams Params that will be updated
 * @returns {Promise<ShoppingListProduct>} Updated pantry product
 */
async function handle(shoppingListProductId, patchParams) {
  try {
    const options = { runValidators: true };
    const updated = await ShoppingListProduct
      .updateOne({ _id: shoppingListProductId }, patchParams, options);

    if (updated.n === 0) {
      throw new NotFoundError(`Shopping List Product with ID ${shoppingListProductId} does not exist`);
    }

    return ShoppingListProduct.findById(shoppingListProductId);
  } catch (error) {
    if (error instanceof BaseError) throw error;
    throw new ValidationError(undefined, error.message);
  }
}

export default {
  handle,
};
