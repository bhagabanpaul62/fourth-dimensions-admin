import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
  images: z.array(z.string().url({ message: 'Please enter a valid URL.' })).min(1, { message: 'At least one image URL is required.' }),
});

export const testimonialSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().min(3, { message: 'Client name must be at least 3 characters long.' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters long.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  videoUrl: z.string().url({ message: 'Please enter a valid video URL.' }).optional().or(z.literal('')),
  displayOrder: z.coerce.number().int().min(0, { message: 'Display order must be a positive number.' }),
  isActive: z.boolean().default(true),
});
