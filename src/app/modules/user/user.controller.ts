import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema, {
  productValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 500,
        description: err.message ?? 'Could not create user!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 500,
        description: err.message ?? 'Could not fetch users!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 404,
        description: err.message ?? 'Could not fetch user!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.updateUserInDB(
      Number(userId),
      zodParsedData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 404,
        description: err.message ?? 'Could not update user!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserFromDB(Number(userId));

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 404,
        description: err.message ?? 'Could not delete user!',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { product: productData } = req.body;

    const zodParsedData = productValidationSchema.parse(productData);

    const updatedUser = await UserServices.addProductToOrderInDB(
      Number(userId),
      zodParsedData,
    );

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 404,
        description: err.message ?? 'Could not add product to order!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
};
