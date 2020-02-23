import PantryProduct from '../domain/PantryProduct';

async function handle(pantryProductParams) {
  const pantryProduct = new PantryProduct(pantryProductParams);

  return pantryProduct.save();
}

export default {
  handle,
};
