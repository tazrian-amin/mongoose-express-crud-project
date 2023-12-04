import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).trim(),
  lastName: z.string({ required_error: 'Last name is required' }).trim(),
});

const addressValidationSchema = z.object({
  street: z.string({ required_error: 'Street is required' }).trim(),
  city: z.string({ required_error: 'Street is required' }).trim(),
  country: z.string({ required_error: 'Country is required' }).trim(),
});

export const productValidationSchema = z.object({
  productName: z.string({ required_error: 'Product name is required' }).trim(),
  price: z
    .number({ required_error: 'Price is required' })
    .nonnegative('Price must be a non-negative number'),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .nonnegative('Quantity must be a non-negative number'),
});

export const createUserValidationSchema = z.object({
  userId: z.number({ required_error: 'User Id is required' }).int().positive(),
  username: z.string({ required_error: 'Username is required' }).trim(),
  password: z.string({ required_error: 'Password is required' }),
  fullName: fullNameValidationSchema,
  age: z.number({ required_error: 'Age is required' }).positive(),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .trim(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string({ required_error: 'Hobbies data is required' })),
  address: addressValidationSchema,
  orders: z.array(productValidationSchema).optional(),
});

export const updateUserValidationSchema = z.object({
  userId: z.number().int().positive().optional(),
  username: z.string().trim().optional(),
  password: z.string().optional(),
  fullName: fullNameValidationSchema.optional(),
  age: z.number().positive().optional(),
  email: z.string().email('Invalid email format').trim().optional(),
  isActive: z.boolean().default(true).optional(),
  hobbies: z.array(z.string()).optional(),
  address: addressValidationSchema.optional(),
  orders: z.array(productValidationSchema).optional(),
});
