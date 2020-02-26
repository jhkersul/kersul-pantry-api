import PantryProduct from '../domain/PantryProduct';

async function handle(offset = 0, limit = 10) {
  return PantryProduct.find({}).skip(offset).limit(limit);
}

export default {
  handle,
};
