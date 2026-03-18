import type { Product } from '@/types';

/**
 * Get the appropriate product image based on selected color
 * Falls back to the default product image if no color-specific image is available
 */
export function getProductImage(product: Product, selectedColor?: string | null): string {
  if (selectedColor && product.colorImages?.[selectedColor]) {
    return product.colorImages[selectedColor];
  }
  return product.image;
}

/**
 * Get the display name for a color hex code
 */
export function getColorDisplayName(colorHex: string, colorNames: Record<string, string>): string {
  return colorNames[colorHex] ?? colorHex;
}