import Product from '../domain/Product';

async function handle(offset = 0, limit = 10) {
  return Product.find({}).skip(offset).limit(limit);
}

export default {
  handle,
};
