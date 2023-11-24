import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TProduct,
  TUser,
  UserModel,
} from './user.interface';

const fullNameSchema = new Schema<TFullName>({
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
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'], trim: true },
  city: { type: String, required: [true, 'City is required'], trim: true },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

const productSchema = new Schema<TProduct>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

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
  username: string,
  email: string,
) {
  const existingUser = await User.findOne({
    $or: [{ userId }, { username }, { email }],
  });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
