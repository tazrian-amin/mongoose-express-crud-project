import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const addressValidationSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const productValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});

const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string().trim(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number().positive(),
  email: z.string().email('Invalid email format').trim(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(productValidationSchema),
});

export default userValidationSchema;
