import ShoppingListProduct from '../domain/ShoppingListProduct';

async function handle(shoppingListProductParams) {
  const shoppingListProduct = new ShoppingListProduct(shoppingListProductParams);

  return shoppingListProduct.save();
}

export default {
  handle,
};
