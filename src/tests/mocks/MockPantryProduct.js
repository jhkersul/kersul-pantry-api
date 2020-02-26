import PantryProduct from '../../domain/PantryProduct';
import MockProduct from './MockProduct';

async function createPantryProduct(
  productId = null,
  quantity = 1,
  expiryDay = 1,
  expiryMonth = 1,
  expiryYear = 2023,
) {
  const selectedProductId = productId || (await MockProduct.createProduct()).id;

  const pantryProduct = new PantryProduct({
    productId: selectedProductId,
    quantity,
    expiryDay,
    expiryMonth,
    expiryYear,
  });

  return pantryProduct.save();
}

async function deleteAll() {
  return PantryProduct.deleteMany({});
}

export default {
  createPantryProduct,
  deleteAll,
};
