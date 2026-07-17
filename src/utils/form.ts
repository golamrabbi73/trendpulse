// This file will house generic form utility functions if needed.
// For example, custom zod refinement methods or error mappers.

import { z } from 'zod';

export const commonValidations = {
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(100, { message: 'Password is too long' }),
};
