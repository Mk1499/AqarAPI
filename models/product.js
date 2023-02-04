import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: String,
    address: String,
    country: String,
    state: String,
    type: String,
    coverImg: String,
    status: {
      type: String,
      default: 'Available',
    },
    price: Number,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);
