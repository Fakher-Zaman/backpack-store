import { describe, it, expect } from 'vitest';
import { createMockPaymentResult } from '@/data/mock-payments';

describe('createMockPaymentResult', () => {
  it('returns a result with the given amount and currency', () => {
    const result = createMockPaymentResult(99.99, 'EUR');
    expect(result.amount).toBe(99.99);
    expect(result.currency).toBe('EUR');
    expect(result.status).toBe('success');
    expect(result.id).toMatch(/^pay_/);
  });

  it('generates unique IDs', () => {
    const a = createMockPaymentResult(10, 'USD');
    const b = createMockPaymentResult(10, 'USD');
    expect(a.id).not.toBe(b.id);
  });
});
