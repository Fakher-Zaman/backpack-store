export interface Collection {
  id: number;
  title: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  colors?: string[];
}

export interface Review {
  id: string;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
}
