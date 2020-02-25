import { model, Schema } from 'mongoose';

const shoppingListProduct = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
    default: 1,
    min: 1,
  },
});

export default model('ShoppingListProduct', shoppingListProduct);
