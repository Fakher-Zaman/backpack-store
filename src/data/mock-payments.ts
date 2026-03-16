import type { PaymentResult } from '@/types/payment.types';

/** Simulates a payment API response for local development. */
export function createMockPaymentResult(amount: number, currency: string): PaymentResult {
  return {
    id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    status: 'success',
    amount,
    currency,
  };
}
