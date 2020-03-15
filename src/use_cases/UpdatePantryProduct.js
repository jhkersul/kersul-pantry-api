import PantryProduct from '../domain/PantryProduct';
import ValidationError from '../exceptions/ValidationError';
import NotFoundError from '../exceptions/NotFoundError';
import BaseError from '../exceptions/BaseError';

/**
 * Updates a Pantry Product
 * @param {ObjectId} pantryProductId ID of Pantry Product to update
 * @param {Object} patchParams Params that will be updated
 * @returns {Promise<PantryProduct>} Updated pantry product
 */
async function handle(pantryProductId, patchParams) {
  try {
    const options = { runValidators: true };
    const updated = await PantryProduct.updateOne({ _id: pantryProductId }, patchParams, options);

    if (updated.n === 0) {
      throw new NotFoundError(`PantryProduct with ID ${pantryProductId} does not exist`);
    }

    return PantryProduct.findById(pantryProductId);
  } catch (error) {
    if (error instanceof BaseError) throw error;
    throw new ValidationError(undefined, error.message);
  }
}

export default {
  handle,
};
