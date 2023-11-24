import { TUser } from './user.interface';
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
  if ((await User.isUserExists(userId)) === null) {
    throw new Error('User not found!');
  }

  const result = await User.findOne({ userId });
  return result;
};

const updateUserInDB = async (userId: number, userData: TUser) => {
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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
