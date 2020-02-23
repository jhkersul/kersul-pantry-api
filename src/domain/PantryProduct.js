import { model, Schema } from 'mongoose';

const pantryProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
    default: 1,
  },
  expiryDay: {
    type: Schema.Types.Number,
    required: false,
  },
  expiryMonth: {
    type: Schema.Types.Number,
    required: false,
  },
  expiryYear: {
    type: Schema.Types.Number,
    required: false,
  },
});

export default model('PantryProduct', pantryProductSchema);
