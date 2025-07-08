import type { Category, ContactRequest, QuotationRequest } from './types';

export const interiorCategories: Category[] = [
  {
    id: 'int-1',
    title: 'Modular Kitchen',
    description: 'Modern, efficient, and stylish modular kitchen designs tailored to your space and needs. High-quality materials and expert installation.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
  },
  {
    id: 'int-2',
    title: 'Living Room Design',
    description: 'Create a comfortable and inviting living space with our custom design solutions. From furniture selection to lighting, we cover it all.',
    images: ['https://placehold.co/600x400.png'],
  },
  {
    id: 'int-3',
    title: 'Bedroom Interiors',
    description: 'Transform your bedroom into a serene retreat. We focus on creating a perfect balance of comfort, style, and functionality.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
  },
];

export const constructionCategories: Category[] = [
  {
    id: 'con-1',
    title: 'Home Construction',
    description: 'Complete home construction services from foundation to finishing. We build your dream home with a focus on quality, durability, and architectural excellence.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
  },
  {
    id: 'con-2',
    title: 'Commercial Renovation',
    description: 'Revitalize your commercial space. Our renovation services for offices, retail stores, and other commercial properties enhance functionality and aesthetic appeal.',
    images: ['https://placehold.co/600x400.png'],
  },
];

export const contactRequests: ContactRequest[] = [
    {
        id: 'cr-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        message: 'Interested in a modular kitchen.',
        type: 'interior',
        submittedAt: new Date('2023-10-26T10:00:00Z'),
    },
    {
        id: 'cr-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '098-765-4321',
        message: 'I want to build a new house.',
        type: 'construction',
        submittedAt: new Date('2023-10-25T15:30:00Z'),
    },
];

export const quotationRequests: QuotationRequest[] = [
    {
        id: 'qr-1',
        fullName: 'Alice Johnson',
        email: 'alice.j@example.com',
        phone: '555-123-4567',
        propertyType: 'Apartment',
        budgetRange: '$5,000 - $10,000',
        constructionStage: 'Planning',
        state: 'California',
        district: 'Los Angeles',
        type: 'interior',
        submittedAt: new Date('2023-10-26T11:00:00Z'),
    },
    {
        id: 'qr-2',
        fullName: 'Bob Williams',
        email: 'bob.w@example.com',
        phone: '555-987-6543',
        propertyType: 'Villa',
        budgetRange: '$100,000 - $200,000',
        constructionStage: 'Ready to Build',
        state: 'Texas',
        district: 'Houston',
        type: 'construction',
        submittedAt: new Date('2023-10-24T09:00:00Z'),
    },
];

// Mock API functions
export const getCategories = async (type: 'interior' | 'construction'): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return type === 'interior' ? interiorCategories : constructionCategories;
};

export const getCategoryById = async (type: 'interior' | 'construction', id: string): Promise<Category | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const source = type === 'interior' ? interiorCategories : constructionCategories;
    return source.find(cat => cat.id === id);
}

export const getContactRequests = async (): Promise<ContactRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return contactRequests;
}

export const getQuotationRequests = async (): Promise<QuotationRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return quotationRequests;
}
