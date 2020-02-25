import PantryProduct from '../domain/PantryProduct';
import NotFoundError from '../exceptions/NotFoundError';

async function handle(pantryProductId) {
  const deleted = await PantryProduct.findByIdAndDelete(pantryProductId);
  if (deleted) return deleted;

  throw new NotFoundError(`PantryProduct with ID ${pantryProductId} does not exist`);
}

export default {
  handle,
};
