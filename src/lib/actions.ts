'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { categorySchema, testimonialSchema } from './schemas';
import {
  interiorCategories,
  constructionCategories,
  contactRequests,
  quotationRequests,
  testimonials,
} from './data';
import type { Category, CategoryType, Testimonial } from './types';
import { randomUUID } from 'crypto';

// In a real app, these would interact with a database.
// For now, we are mutating the in-memory arrays.

// --- CATEGORY ACTIONS ---
export async function saveCategory(
  type: CategoryType,
  values: z.infer<typeof categorySchema>
) {
  const validatedData = categorySchema.parse(values);
  const { id, ...rest } = validatedData;
  const targetArray =
    type === 'interior' ? interiorCategories : constructionCategories;

  if (id) {
    // Update existing category
    const index = targetArray.findIndex((c) => c.id === id);
    if (index !== -1) {
      targetArray[index] = { ...targetArray[index], ...rest, id };
    }
  } else {
    // Create new category
    const newCategory: Category = {
      id: randomUUID(),
      ...rest,
    };
    targetArray.push(newCategory);
  }

  // Simulate DB operation
  await new Promise((res) => setTimeout(res, 1000));

  revalidatePath(`/${type}`);
  revalidatePath('/');
}

export async function deleteCategory(type: CategoryType, id: string) {
  const targetArray =
    type === 'interior' ? interiorCategories : constructionCategories;
  const index = targetArray.findIndex((c) => c.id === id);
  if (index > -1) {
    targetArray.splice(index, 1);
  }
  // Simulate DB operation
  await new Promise((res) => setTimeout(res, 500));
  revalidatePath(`/${type}`);
  revalidatePath('/');
}

// --- REQUEST ACTIONS ---
export async function deleteContactRequest(id: string) {
  const index = contactRequests.findIndex((r) => r.id === id);
  if (index > -1) {
    contactRequests.splice(index, 1);
  }
  // Simulate DB operation
  await new Promise((res) => setTimeout(res, 500));
  revalidatePath('/contact-requests');
  revalidatePath('/');
}

export async function deleteQuotationRequest(id: string) {
  const index = quotationRequests.findIndex((r) => r.id === id);
  if (index > -1) {
    quotationRequests.splice(index, 1);
  }
  // Simulate DB operation
  await new Promise((res) => setTimeout(res, 500));
  revalidatePath('/quotation-requests');
  revalidatePath('/');
}

// --- TESTIMONIAL ACTIONS ---
export async function saveTestimonial(
  values: z.infer<typeof testimonialSchema>
) {
  const validatedData = testimonialSchema.parse(values);
  const { id, ...rest } = validatedData;
  
  if (id) {
    // Update existing testimonial
    const index = testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      testimonials[index] = { 
        ...testimonials[index],
        ...rest,
        mediaUrl: rest.mediaUrl || undefined,
        mediaType: rest.mediaType || undefined,
        id 
      };
    }
  } else {
    // Create new testimonial
    const newTestimonial: Testimonial = {
      id: randomUUID(),
      ...rest,
      mediaUrl: rest.mediaUrl || undefined,
      mediaType: rest.mediaType || undefined,
    };
    testimonials.push(newTestimonial);
  }

  // Simulate DB operation
  await new Promise((res) => setTimeout(res, 1000));

  revalidatePath(`/testimonials`);
  revalidatePath('/');
}

export async function deleteTestimonial(id: string) {
  const index = testimonials.findIndex((t) => t.id === id);
  if (index > -1) {
    testimonials.splice(index, 1);
  }
  // Simulate DB operation
  await new Promise((res) => setTimeout(res, 500));
  revalidatePath(`/testimonials`);
  revalidatePath('/');
}
