import type { Category, ContactRequest, QuotationRequest, Testimonial, HeroImage, CategoryType } from './types';
import { getDb } from './db';
import { Document, WithId, MongoServerError } from 'mongodb';

function mapDoc<T>(doc: WithId<Document>): T {
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest } as T;
}

const AUTH_ERROR_MESSAGE = `Database Authorization Error: The user specified in your MONGODB_URI does not have permission to perform this action. Please grant the 'readWrite' role to the user for the 'archicontrol' database. Refer to the README.md file for detailed instructions on how to grant permissions.`;

async function handleMongoError<T>(operation: () => Promise<T>): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 13) { // 13 is the error code for "Unauthorized"
            throw new Error(AUTH_ERROR_MESSAGE);
        }
        // Re-throw other errors
        throw error;
    }
}


// --- CATEGORY ---
export const getCategories = async (type: CategoryType): Promise<Category[]> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const results = await db.collection('categories').find({ type }).toArray();
        return results.map(doc => mapDoc<Category>(doc));
    });
};

export const getCategoryById = async (type: CategoryType, id: string): Promise<Category | undefined> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const result = await db.collection('categories').findOne({ _id: id, type });
        return result ? mapDoc<Category>(result) : undefined;
    });
}

// --- REQUESTS ---
export const getContactRequests = async (): Promise<ContactRequest[]> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const results = await db.collection('contactrequests').find().sort({ submittedAt: -1 }).toArray();
        return results.map(doc => mapDoc<ContactRequest>(doc));
    });
}

export const getQuotationRequests = async (): Promise<QuotationRequest[]> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const results = await db.collection('quotationrequests').find().sort({ submittedAt: -1 }).toArray();
        return results.map(doc => mapDoc<QuotationRequest>(doc));
    });
}

// --- TESTIMONIALS ---
export const getTestimonials = async (): Promise<Testimonial[]> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const results = await db.collection('testimonials').find().sort({ displayOrder: 1 }).toArray();
        return results.map(doc => mapDoc<Testimonial>(doc));
    });
};

export const getTestimonialById = async (id: string): Promise<Testimonial | undefined> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const result = await db.collection('testimonials').findOne({ _id: id });
        return result ? mapDoc<Testimonial>(result) : undefined;
    });
}

// --- HERO IMAGES ---
export const getHeroImages = async (): Promise<HeroImage[]> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const results = await db.collection('heroimages').find().sort({ displayOrder: 1 }).toArray();
        return results.map(doc => mapDoc<HeroImage>(doc));
    });
};

export const getHeroImageById = async (id: string): Promise<HeroImage | undefined> => {
    return handleMongoError(async () => {
        const db = await getDb();
        const result = await db.collection('heroimages').findOne({ _id: id });
        return result ? mapDoc<HeroImage>(result) : undefined;
    });
}
