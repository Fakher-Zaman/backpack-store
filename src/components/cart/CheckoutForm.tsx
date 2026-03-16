import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { usePayment } from '@/hooks/usePayment';
import type { PaymentResult } from '@/types/payment.types';

interface CheckoutFormProps {
  onBack: () => void;
  onSuccess: (result: PaymentResult) => void;
}

const CURRENCIES = ['USD', 'EUR', 'GBP'] as const;
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '\u20AC',
  GBP: '\u00A3',
};

export default function CheckoutForm({ onBack, onSuccess }: CheckoutFormProps) {
  const { items, total } = useCart();
  const { status, result, error, submitPayment } = usePayment();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currency, setCurrency] = useState<typeof CURRENCIES[number]>('USD');

  const isProcessing = status === 'processing';
  const canSubmit = name.trim().length >= 2 && email.includes('@') && items.length > 0;

  useEffect(() => {
    if (status === 'success' && result) {
      onSuccess(result);
    }
  }, [status, result, onSuccess]);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    await submitPayment({
      items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
      customer: { name: name.trim(), email: email.trim() },
      currency,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b px-6 py-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          aria-label="Back to cart"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500
            transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-40"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-display text-lg font-bold">Checkout</h2>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        <div>
          <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="checkout-name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isProcessing}
            placeholder="John Doe"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm
              transition-colors placeholder:text-gray-400
              focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green
              disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label htmlFor="checkout-email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="checkout-email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isProcessing}
            placeholder="john@example.com"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm
              transition-colors placeholder:text-gray-400
              focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green
              disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label htmlFor="checkout-currency" className="mb-1.5 block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            id="checkout-currency"
            value={currency}
            onChange={e => setCurrency(e.target.value as typeof CURRENCIES[number])}
            disabled={isProcessing}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm
              transition-colors focus:border-brand-green focus:outline-none focus:ring-1
              focus:ring-brand-green disabled:bg-gray-50 disabled:text-gray-400"
          >
            {CURRENCIES.map(c => (
              <option key={c} value={c}>{c} ({CURRENCY_SYMBOLS[c]})</option>
            ))}
          </select>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
      </div>

      <div className="border-t px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total</span>
          <span className="text-lg font-bold">
            {CURRENCY_SYMBOLS[currency]}{total.toFixed(2)}
          </span>
        </div>
        <button
          type="submit"
          disabled={!canSubmit || isProcessing}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green
            py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </>
          ) : (
            `Pay ${CURRENCY_SYMBOLS[currency]}${total.toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}
