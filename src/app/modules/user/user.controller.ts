import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { TUpdateUser, TUser } from './user.interface';
import { UserServices } from './user.service';
import {
  createUserValidationSchema,
  productValidationSchema,
  updateUserValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData: TUser = req.body;

    const zodParsedData = createUserValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(500).json({
        success: false,
        message: err.issues[0].message,
        error: {
          code: err.issues[0].code,
          description: `${err.issues[0].message}`,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message ?? 'Something went wrong!',
        error: {
          code: err.code ?? 500,
          description: err.message ?? 'Could not create user!',
        },
      });
    }
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
    const userData: TUpdateUser = req.body;

    const zodParsedData = updateUserValidationSchema.parse(userData);

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
    if (err instanceof ZodError) {
      res.status(500).json({
        success: false,
        message: err.issues[0].message,
        error: {
          code: err.issues[0].code,
          description: `${err.issues[0].message}`,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message ?? 'Something went wrong!',
        error: {
          code: err.code ?? 500,
          description: err.message ?? 'Could not create user!',
        },
      });
    }
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

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getUserOrdersFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 404,
        description: err.message ?? 'Could not get user orders!',
      },
    });
  }
};

const calculateOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.calculateOrderPriceInDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message ?? 'Something went wrong!',
      error: {
        code: err.code ?? 404,
        description: err.message ?? 'Could not calculate total price!',
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
  getUserOrders,
  calculateOrderPrice,
};
