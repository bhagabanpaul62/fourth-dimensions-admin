import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
  images: z.array(z.string().url({ message: 'Please enter a valid URL.' })).min(1, { message: 'At least one image URL is required.' }),
});
