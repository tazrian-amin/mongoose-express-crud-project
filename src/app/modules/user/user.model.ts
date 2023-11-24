import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TFullName,
  TProduct,
  TUser,
  UserModel,
} from './user.interface';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    street: {
      type: String,
      required: [true, 'Street is required'],
      trim: true,
    },
    city: { type: String, required: [true, 'City is required'], trim: true },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: [true, 'Active status is required'],
  },
  hobbies: [{ type: String }],
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: [productSchema],
});

userSchema.statics.isUserExists = async function (
  userId: number,
  username?: string,
  email?: string,
) {
  const existingUser = await User.findOne({
    $or: [{ userId }, { username }, { email }],
  });
  return existingUser;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = this.getUpdate() as any;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    delete ret.orders;
    delete ret.__v;
    return ret;
  },
});

export const User = model<TUser, UserModel>('User', userSchema);
