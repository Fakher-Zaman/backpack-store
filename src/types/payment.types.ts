import { z } from 'zod';

export const paymentItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1),
});

export const paymentInputSchema = z.object({
  items: z.array(paymentItemSchema).min(1, 'Cart must have at least one item'),
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
  }),
  currency: z.enum(['USD', 'EUR', 'GBP']).default('USD'),
});

export type PaymentItem = z.infer<typeof paymentItemSchema>;
export type PaymentInput = z.infer<typeof paymentInputSchema>;

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export type PaymentResult = {
  id: string;
  status: 'success' | 'failed';
  amount: number;
  currency: string;
};
