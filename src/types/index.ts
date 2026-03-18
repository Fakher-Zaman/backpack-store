export type Collection = {
  id: number;
  title: string;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  colors?: string[];
  colorImages?: Record<string, string>;
  category?: string;
  description?: string;
};

export type Review = {
  id: string;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
};
