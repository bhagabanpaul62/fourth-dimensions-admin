export type CategoryType = 'interior' | 'construction';

export interface Category {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: CategoryType;
  submittedAt: Date;
}

export interface QuotationRequest {
  id: string;
  fullName: string;
  email:string;
  phone: string;
  propertyType: string;
  budgetRange: string;
  constructionStage: string;
  state: string;
  district: string;
  type: CategoryType;
  submittedAt: Date;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  content: string;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface HeroImage {
  id: string;
  displayOrder: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
}
