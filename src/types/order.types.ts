import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  lineTotal: z.number().positive(),
});

export const orderSchema = z.object({
  orderId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  items: z.array(orderItemSchema).min(1),
  total: z.number().positive(),
  currency: z.enum(['USD', 'EUR', 'GBP']),
  status: z.enum(['completed', 'processing', 'failed']),
  createdAt: z.string(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;
