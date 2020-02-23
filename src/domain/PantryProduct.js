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
    min: 1,
  },
  expiryDay: {
    type: Schema.Types.Number,
    required: false,
    min: 1,
    max: 31,
  },
  expiryMonth: {
    type: Schema.Types.Number,
    required: false,
    min: 1,
    max: 12,
  },
  expiryYear: {
    type: Schema.Types.Number,
    required: false,
    min: 2020,
  },
});

export default model('PantryProduct', pantryProductSchema);
