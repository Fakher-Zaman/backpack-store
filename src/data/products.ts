import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Canvas Backpack',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&h=500&fit=crop',
    rating: 4.5,
    colors: ['#2C2C2C', '#5C4033', '#1A3A25'],
    colorImages: {
      '#2C2C2C': 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&h=500&fit=crop',
      '#5C4033': 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&h=500&fit=crop',
      '#1A3A25': 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=500&h=500&fit=crop',
    },
    category: 'Casual',
    description:
      'A timeless everyday carry made from organic cotton canvas with vegetable-tanned leather accents. Features a padded laptop sleeve, dual water bottle pockets, and a hidden anti-theft pocket. Perfect for commuting, campus, or weekend getaways.',
  },
  {
    id: 2,
    name: 'Urban Explorer Pack',
    price: 89,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    rating: 4,
    colors: ['#2C2C2C', '#4A5568'],
    colorImages: {
      '#2C2C2C': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      '#4A5568': 'https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=500&h=500&fit=crop',
    },
    category: 'Travel',
    description:
      'Designed for city adventurers who need versatility. Made from recycled polyester with a water-resistant coating, it includes a roll-top closure, quick-access front pocket, and integrated USB charging port.',
  },
  {
    id: 3,
    name: 'Mountain Trail Backpack',
    price: 120,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1509762774605-f07235a08f1f?w=500&h=500&fit=crop',
    rating: 5,
    colors: ['#1A3A25', '#2C2C2C'],
    colorImages: {
      '#1A3A25': 'https://images.unsplash.com/photo-1509762774605-f07235a08f1f?w=500&h=500&fit=crop',
      '#2C2C2C': 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=500&h=500&fit=crop',
    },
    category: 'Outdoor',
    description:
      'Built for serious hikers. 45L capacity with an adjustable torso-length harness, load-lifter straps, and a ventilated back panel. Includes a rain cover, trekking pole attachments, and a hydration reservoir sleeve.',
  },
  {
    id: 4,
    name: 'Minimalist Day Pack',
    price: 59,
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=500&fit=crop',
    rating: 4,
    colors: ['#E8DFD0', '#2C2C2C', '#5C4033'],
    colorImages: {
      '#E8DFD0': 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=500&fit=crop',
      '#2C2C2C': 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=500&h=500&fit=crop',
      '#5C4033': 'https://images.unsplash.com/photo-1559893088-c0787ebfc084?w=500&h=500&fit=crop',
    },
    category: 'Casual',
    description:
      'Light, simple, and effortlessly stylish. This 18L day pack is made from organic cotton and weighs just 340g. Ideal for daily errands, light travel, or a minimalist carry.',
  },
  {
    id: 5,
    name: 'Vintage Leather Backpack',
    price: 149,
    originalPrice: 189,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    rating: 4.5,
    category: 'Casual',
    description:
      'Hand-stitched from full-grain vegetable-tanned leather that develops a rich patina over time. Features solid brass hardware, a suede-lined laptop compartment, and two front buckle pockets.',
  },
  {
    id: 6,
    name: 'Waterproof Adventure Pack',
    price: 109,
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&h=500&fit=crop',
    rating: 4.5,
    colors: ['#2C2C2C', '#1A3A25'],
    colorImages: {
      '#2C2C2C': 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&h=500&fit=crop',
      '#1A3A25': 'https://images.unsplash.com/photo-1532162323825-3b1b6e582b95?w=500&h=500&fit=crop',
    },
    category: 'Outdoor',
    description:
      'Go anywhere in any weather. Fully welded seams, waterproof YKK zippers, and a 500D TPU-coated shell keep your gear dry in the harshest conditions. 35L capacity with a removable hip belt.',
  },
];
