import ShoppingListProduct from '../domain/ShoppingListProduct';

async function getShoppingListItemByProductId(productId) {
  try {
    const shoppingListProduct = await ShoppingListProduct.findOne({ productId });

    return shoppingListProduct;
  } catch (error) {
    return null;
  }
}

async function addQuantityToShoppingListItem(shoppingListProduct, quantity) {
  const updateShoppingListProduct = shoppingListProduct;
  updateShoppingListProduct.quantity += quantity;

  return shoppingListProduct.save();
}

async function createNewShoppingListProduct(shoppingListProductParams) {
  const shoppingListProduct = new ShoppingListProduct(shoppingListProductParams);
  return shoppingListProduct.save();
}

async function handle(shoppingListProductParams) {
  const { productId, quantity } = shoppingListProductParams;
  const alreadyExistShoppingListProduct = await getShoppingListItemByProductId(productId);

  if (alreadyExistShoppingListProduct) {
    return addQuantityToShoppingListItem(alreadyExistShoppingListProduct, quantity);
  }

  return createNewShoppingListProduct(shoppingListProductParams);
}

export default {
  handle,
};
