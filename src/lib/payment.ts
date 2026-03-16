import { api } from '@/lib/axios';
import { paymentInputSchema } from '@/types/payment.types';
import type { PaymentInput, PaymentResult } from '@/types/payment.types';

/** Validate input with Zod, then submit payment to the API. */
export async function processPayment(input: unknown): Promise<PaymentResult> {
  const validated: PaymentInput = paymentInputSchema.parse(input);
  const { data } = await api.post<PaymentResult>('/payments', validated);
  return data;
}

/** Retrieve payment status by ID. */
export async function getPaymentStatus(paymentId: string): Promise<PaymentResult> {
  const { data } = await api.get<PaymentResult>(`/payments/${encodeURIComponent(paymentId)}`);
  return data;
}
