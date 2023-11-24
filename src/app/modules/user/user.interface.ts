/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TProduct = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TProduct[];
};

export interface UserModel extends Model<TUser> {
  isUserExists(
    userId: number,
    username?: string,
    email?: string,
  ): Promise<TUser | null>;
}
