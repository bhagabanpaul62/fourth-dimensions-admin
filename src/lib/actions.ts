'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { categorySchema, testimonialSchema, heroImageSchema } from './schemas';
import { getDb } from './db';
import type { CategoryType } from './types';
import { randomUUID } from 'crypto';
import { MongoServerError } from 'mongodb';

const AUTH_ERROR_MESSAGE = `Database Authorization Error: The user specified in your MONGODB_URI does not have permission to perform this action. Please grant the 'readWrite' role to the user for the 'archicontrol' database. Refer to the README.md file for detailed instructions on how to grant permissions.`;

async function handleMongoError<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 13) {
      // 13 is the error code for "Unauthorized"
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    // Re-throw other errors
    throw error;
  }
}

// --- CATEGORY ACTIONS ---
export async function saveCategory(
  type: CategoryType,
  values: z.infer<typeof categorySchema>
) {
  await handleMongoError(async () => {
    const validatedData = categorySchema.parse(values);
    const db = await getDb();
    const collection = db.collection('categories');
    const { id, ...rest } = validatedData;

    if (id) {
      await collection.updateOne({ _id: id }, { $set: { ...rest, type } });
    } else {
      const newId = randomUUID();
      await collection.insertOne({ _id: newId, ...rest, type });
    }
  });

  revalidatePath(`/${type}`);
  revalidatePath('/');
}

export async function deleteCategory(type: CategoryType, id: string) {
  await handleMongoError(async () => {
    const db = await getDb();
    await db.collection('categories').deleteOne({ _id: id, type });
  });

  revalidatePath(`/${type}`);
  revalidatePath('/');
}

// --- REQUEST ACTIONS ---
export async function deleteContactRequest(id: string) {
  await handleMongoError(async () => {
    const db = await getDb();
    await db.collection('contactrequests').deleteOne({ _id: id });
  });

  revalidatePath('/contact-requests');
  revalidatePath('/');
}

export async function deleteQuotationRequest(id: string) {
  await handleMongoError(async () => {
    const db = await getDb();
    await db.collection('quotationrequests').deleteOne({ _id: id });
  });

  revalidatePath('/quotation-requests');
  revalidatePath('/');
}

// --- TESTIMONIAL ACTIONS ---
export async function saveTestimonial(
  values: z.infer<typeof testimonialSchema>
) {
  await handleMongoError(async () => {
    const validatedData = testimonialSchema.parse(values);
    const db = await getDb();
    const collection = db.collection('testimonials');
    const { id, ...rest } = validatedData;

    const testimonialData = {
      ...rest,
      mediaUrl: rest.mediaUrl || undefined,
      mediaType: rest.mediaType || undefined,
    };

    if (id) {
      await collection.updateOne({ _id: id }, { $set: testimonialData });
    } else {
      const newId = randomUUID();
      await collection.insertOne({ _id: newId, ...testimonialData });
    }
  });

  revalidatePath(`/testimonials`);
  revalidatePath('/');
}

export async function deleteTestimonial(id: string) {
  await handleMongoError(async () => {
    const db = await getDb();
    await db.collection('testimonials').deleteOne({ _id: id });
  });

  revalidatePath(`/testimonials`);
  revalidatePath('/');
}

// --- HERO IMAGE ACTIONS ---
export async function saveHeroImage(values: z.infer<typeof heroImageSchema>) {
  await handleMongoError(async () => {
    const validatedData = heroImageSchema.parse(values);
    const db = await getDb();
    const collection = db.collection('heroimages');
    const { id, ...rest } = validatedData;

    const heroImageData = {
      ...rest,
      title: rest.title || '',
    };

    if (id) {
      await collection.updateOne({ _id: id }, { $set: heroImageData });
    } else {
      const newId = randomUUID();
      await collection.insertOne({ _id: newId, ...heroImageData });
    }
  });

  revalidatePath(`/hero-images`);
  revalidatePath('/');
}

export async function deleteHeroImage(id: string) {
  await handleMongoError(async () => {
    const db = await getDb();
    await db.collection('heroimages').deleteOne({ _id: id });
  });

  revalidatePath(`/hero-images`);
  revalidatePath('/');
}
