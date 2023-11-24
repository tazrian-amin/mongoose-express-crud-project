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

export const UserServices = {
  createUserIntoDB,
};
