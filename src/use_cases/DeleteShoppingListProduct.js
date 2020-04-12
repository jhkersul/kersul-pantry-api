import ShoppingListProduct from '../domain/ShoppingListProduct';
import NotFoundError from '../exceptions/NotFoundError';

async function handle(shoppingListProductId) {
  const deleted = await ShoppingListProduct.findByIdAndDelete(shoppingListProductId);
  if (deleted) return deleted;

  throw new NotFoundError(`Shopping List Product with ID ${shoppingListProductId} does not exist`);
}

export default {
  handle,
};
