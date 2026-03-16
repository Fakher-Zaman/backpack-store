import { api } from '@/lib/axios';
import { paymentInputSchema } from '@/types/payment.types';
import { products } from '@/data/products';
import { createMockPaymentResult } from '@/data/mock-payments';
import type { PaymentInput, PaymentResult } from '@/types/payment.types';

const USE_MOCK = !import.meta.env.VITE_API_URL;

function calculateTotal(items: PaymentInput['items']): number {
  return items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
}

/** Validate input with Zod, then submit payment (real API or mock). */
export async function processPayment(input: unknown): Promise<PaymentResult> {
  const validated: PaymentInput = paymentInputSchema.parse(input);

  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const amount = calculateTotal(validated.items);
    return createMockPaymentResult(amount, validated.currency ?? 'USD');
  }

  const { data } = await api.post<PaymentResult>('/payments', validated);
  return data;
}

/** Retrieve payment status by ID. */
export async function getPaymentStatus(paymentId: string): Promise<PaymentResult> {
  const { data } = await api.get<PaymentResult>(`/payments/${encodeURIComponent(paymentId)}`);
  return data;
}
