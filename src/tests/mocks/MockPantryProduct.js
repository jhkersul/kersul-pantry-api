import PantryProduct from '../../domain/PantryProduct';

async function createPantryProduct(
  productId,
  quantity = 1,
  expiryDay = 1,
  expiryMonth = 1,
  expiryYear = 2023,
) {
  const pantryProduct = new PantryProduct({
    productId,
    quantity,
    expiryDay,
    expiryMonth,
    expiryYear,
  });

  return pantryProduct.save();
}

export default {
  createPantryProduct,
};
