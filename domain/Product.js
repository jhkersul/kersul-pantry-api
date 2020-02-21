import { model, Schema } from 'mongoose';

const imageSchema = new Schema({
  url: {
    type: Schema.Types.String,
    required: true,
  },
});

const productSchema = new Schema({
  barCode: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: false,
  },
  width: {
    type: Schema.Types.Number,
    required: false,
  },
  height: {
    type: Schema.Types.Number,
    required: false,
  },
  length: {
    type: Schema.Types.Number,
    required: false,
  },
  netWeight: {
    type: Schema.Types.Number,
    required: false,
  },
  grossWeight: {
    type: Schema.Types.Number,
    required: false,
  },
  price: {
    type: Schema.Types.Number,
    required: false,
  },
  images: [imageSchema],
});

export default model('Product', productSchema);
