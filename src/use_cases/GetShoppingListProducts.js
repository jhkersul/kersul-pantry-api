import ShoppingListProduct from '../domain/ShoppingListProduct';

async function handle(offset = 0, limit = 10) {
  return ShoppingListProduct.find({}).skip(offset).limit(limit);
}

export default {
  handle,
};
