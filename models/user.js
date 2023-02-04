import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      default: 'user',
    },
    products: {
      type: [mongoose.Types.ObjectId],
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
