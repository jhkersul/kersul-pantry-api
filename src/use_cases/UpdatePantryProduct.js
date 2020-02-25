import PantryProduct from '../domain/PantryProduct';
import ValidationError from '../exceptions/ValidationError';

async function handle(pantryProductId, patchParams) {
  try {
    const options = { runValidators: true };
    const updated = await PantryProduct.updateOne({ _id: pantryProductId }, patchParams, options);

    if (updated.n === 0) {
      throw new ValidationError(undefined, 'Invalid Pantry Product ID');
    }

    return PantryProduct.findById(pantryProductId);
  } catch (error) {
    throw new ValidationError(undefined, error.message);
  }
}

export default {
  handle,
};
