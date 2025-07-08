'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { z } from 'zod';
import type { categorySchema } from './schemas';

// In a real app, these would interact with a database.
// For now, they just log to the console.

// --- CATEGORY ACTIONS ---
export async function saveCategory(
  type: 'interior' | 'construction',
  data: z.infer<typeof categorySchema>
) {
  console.log(`Saving ${type} category:`, data);
  // Simulate DB operation
  await new Promise(res => setTimeout(res, 1000));
  revalidatePath(`/${type}`);
  redirect(`/${type}`);
}

export async function deleteCategory(type: 'interior' | 'construction', id: string) {
  console.log(`Deleting ${type} category with id: ${id}`);
  // Simulate DB operation
  await new Promise(res => setTimeout(res, 500));
  revalidatePath(`/${type}`);
}

// --- REQUEST ACTIONS ---
export async function deleteContactRequest(id: string) {
  console.log(`Deleting contact request with id: ${id}`);
  // Simulate DB operation
  await new Promise(res => setTimeout(res, 500));
  revalidatePath('/contact-requests');
}

export async function deleteQuotationRequest(id: string) {
  console.log(`Deleting quotation request with id: ${id}`);
  // Simulate DB operation
  await new Promise(res => setTimeout(res, 500));
  revalidatePath('/quotation-requests');
}
