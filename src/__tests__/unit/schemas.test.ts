import { describe, it, expect } from 'vitest';
import { loginSchema } from '@/types/auth.types';
import { paymentInputSchema, paymentItemSchema } from '@/types/payment.types';

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'secret123' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'secret123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  it('rejects short password', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: '12345' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 6 characters');
    }
  });

  it('rejects missing fields', () => {
    const result = loginSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('rejects empty email', () => {
    const result = loginSchema.safeParse({ email: '', password: 'secret123' });
    expect(result.success).toBe(false);
  });
});

describe('paymentItemSchema', () => {
  it('accepts valid item', () => {
    expect(paymentItemSchema.safeParse({ productId: 1, quantity: 2 }).success).toBe(true);
  });

  it('rejects zero quantity', () => {
    expect(paymentItemSchema.safeParse({ productId: 1, quantity: 0 }).success).toBe(false);
  });

  it('rejects negative productId', () => {
    expect(paymentItemSchema.safeParse({ productId: -1, quantity: 1 }).success).toBe(false);
  });

  it('rejects non-integer quantity', () => {
    expect(paymentItemSchema.safeParse({ productId: 1, quantity: 1.5 }).success).toBe(false);
  });
});

describe('paymentInputSchema', () => {
  const validInput = {
    items: [{ productId: 1, quantity: 2 }],
    customer: { name: 'John Doe', email: 'john@example.com' },
    currency: 'USD',
  };

  it('accepts valid payment input', () => {
    expect(paymentInputSchema.safeParse(validInput).success).toBe(true);
  });

  it('defaults currency to USD when omitted', () => {
    const { currency, ...withoutCurrency } = validInput;
    const result = paymentInputSchema.safeParse(withoutCurrency);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.currency).toBe('USD');
    }
  });

  it('rejects empty items array', () => {
    const result = paymentInputSchema.safeParse({ ...validInput, items: [] });
    expect(result.success).toBe(false);
  });

  it('rejects invalid currency', () => {
    const result = paymentInputSchema.safeParse({ ...validInput, currency: 'JPY' });
    expect(result.success).toBe(false);
  });

  it('rejects short customer name', () => {
    const result = paymentInputSchema.safeParse({
      ...validInput,
      customer: { name: 'A', email: 'a@b.com' },
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid customer email', () => {
    const result = paymentInputSchema.safeParse({
      ...validInput,
      customer: { name: 'John', email: 'not-email' },
    });
    expect(result.success).toBe(false);
  });
});
