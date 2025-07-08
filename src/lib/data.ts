import type { Category, ContactRequest, QuotationRequest, Testimonial } from './types';

export let interiorCategories: Category[] = [
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

export let constructionCategories: Category[] = [
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

export let contactRequests: ContactRequest[] = [
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

export let quotationRequests: QuotationRequest[] = [
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

export let testimonials: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Bala Shanmugakumar',
    location: 'Plutus Residence, Chennai',
    content: "Bala was looking for a match in wavelength and vision for his home. He found that in HomeLane. HomeLane's well-structured workflow helped him stay abreast of the process at all times, from design to production to delivery. The 3D design software, Spacecraft Pro, also gave him a clear picture of how his home would look like. Book your consultation with HomeLane today!",
    mediaType: 'image',
    mediaUrl: 'https://placehold.co/100x100.png',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'test-2',
    clientName: 'Joytilak and Anushua',
    location: 'Sobha Silicon Oasis, Bengaluru',
    content: "Joytilak and Anushua tried to find designers but they could find none, that matched their vision. HomeLane provided them with a designer who understood their vision and made it a reality even before the promised delivery date. The material quality and execution of the design were in their words 'top-notch'. The glowing compliments received about their home interiors from friends and family were a cherry on the cake.",
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    displayOrder: 2,
    isActive: true,
  },
   {
    id: 'test-3',
    clientName: 'Inactive User',
    location: 'Future Project, Delhi',
    content: "This is an example of an inactive testimonial that will not be displayed on the live site but is still manageable here in the admin panel.",
    mediaType: 'image',
    mediaUrl: 'https://placehold.co/100x100.png',
    displayOrder: 3,
    isActive: false,
  },
];


// Mock API functions
export const getCategories = async (type: 'interior' | 'construction'): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return type === 'interior' ? [...interiorCategories] : [...constructionCategories];
};

export const getCategoryById = async (type: 'interior' | 'construction', id: string): Promise<Category | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const source = type === 'interior' ? interiorCategories : constructionCategories;
    return source.find(cat => cat.id === id);
}

export const getContactRequests = async (): Promise<ContactRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...contactRequests];
}

export const getQuotationRequests = async (): Promise<QuotationRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...quotationRequests];
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...testimonials];
};

export const getTestimonialById = async (id: string): Promise<Testimonial | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return testimonials.find(t => t.id === id);
}
