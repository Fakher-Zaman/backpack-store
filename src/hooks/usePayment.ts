import { useCallback, useState } from 'react';
import { processPayment } from '@/lib/payment';
import type { PaymentResult, PaymentStatus } from '@/types/payment.types';

type UsePaymentReturn = {
  status: PaymentStatus;
  result: PaymentResult | null;
  error: string | null;
  submitPayment: (input: unknown) => Promise<void>;
  reset: () => void;
};

/** Hook that wraps the payment service with loading, error, and success states. */
export function usePayment(): UsePaymentReturn {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitPayment = useCallback(async (input: unknown) => {
    setStatus('processing');
    setError(null);
    setResult(null);

    try {
      const paymentResult = await processPayment(input);
      setResult(paymentResult);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, submitPayment, reset };
}
