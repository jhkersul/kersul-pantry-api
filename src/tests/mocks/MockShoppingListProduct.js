import ShoppingListProduct from '../../domain/ShoppingListProduct';
import MockProduct from './MockProduct';

async function createShoppingListProduct(
  productId = null,
  quantity = 1,
) {
  const selectedProductId = productId || (await MockProduct.createProduct()).id;

  const pantryProduct = new ShoppingListProduct({
    productId: selectedProductId,
    quantity,
  });

  return pantryProduct.save();
}

async function deleteAll() {
  return ShoppingListProduct.deleteMany({});
}

export default {
  createShoppingListProduct,
  deleteAll,
};
