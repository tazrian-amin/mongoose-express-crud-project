import { TProduct, TUpdateUser, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const { userId, username, email } = userData;

  if (await User.isUserExists(userId, username, email)) {
    throw new Error(
      'User already exists with the same UserId, Username, or Email!',
    );
  }

  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({}, 'username fullName age email address');
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const user = await User.isUserExists(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updateUserInDB = async (userId: number, userData: TUpdateUser) => {
  if ((await User.isUserExists(userId)) === null) {
    throw new Error('User not found!');
  }

  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
  });

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  if ((await User.isUserExists(userId)) === null) {
    throw new Error('User not found!');
  }

  const result = await User.deleteOne({ userId });

  if (result.deletedCount === 0) {
    throw new Error('Could not delete the user!');
  }

  return result;
};

const addProductToOrderInDB = async (userId: number, productData: TProduct) => {
  const user = await User.isUserExists(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(productData);
  await user.save();

  return user;
};

const getUserOrdersFromDB = async (userId: number) => {
  const user = await User.isUserExists(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const { orders } = user;

  return { orders };
};

const calculateOrderPriceInDB = async (userId: number) => {
  const user = await User.isUserExists(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const totalPrice = user.orders?.reduce((accumulator, order) => {
    return accumulator + order.price * order.quantity;
  }, 0);

  return { totalPrice };
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  addProductToOrderInDB,
  getUserOrdersFromDB,
  calculateOrderPriceInDB,
};
