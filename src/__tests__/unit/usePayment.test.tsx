import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePayment } from '@/hooks/usePayment';

vi.mock('@/lib/payment', () => ({
  processPayment: vi.fn(),
}));

import { processPayment } from '@/lib/payment';
const mockedProcessPayment = vi.mocked(processPayment);

describe('usePayment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts in idle state', () => {
    const { result } = renderHook(() => usePayment());
    expect(result.current.status).toBe('idle');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('transitions to success on successful payment', async () => {
    const mockResult = { id: 'pay_1', status: 'success' as const, amount: 100, currency: 'USD' };
    mockedProcessPayment.mockResolvedValue(mockResult);

    const { result } = renderHook(() => usePayment());
    await act(async () => {
      await result.current.submitPayment({ valid: 'input' });
    });

    expect(result.current.status).toBe('success');
    expect(result.current.result).toEqual(mockResult);
    expect(result.current.error).toBeNull();
  });

  it('transitions to error on failed payment', async () => {
    mockedProcessPayment.mockRejectedValue(new Error('Card declined'));

    const { result } = renderHook(() => usePayment());
    await act(async () => {
      await result.current.submitPayment({ bad: 'input' });
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Card declined');
    expect(result.current.result).toBeNull();
  });

  it('uses fallback message for non-Error throws', async () => {
    mockedProcessPayment.mockRejectedValue('something');

    const { result } = renderHook(() => usePayment());
    await act(async () => {
      await result.current.submitPayment({});
    });

    expect(result.current.error).toBe('Payment failed');
  });

  it('resets back to idle state', async () => {
    const mockResult = { id: 'pay_1', status: 'success' as const, amount: 100, currency: 'USD' };
    mockedProcessPayment.mockResolvedValue(mockResult);

    const { result } = renderHook(() => usePayment());
    await act(async () => {
      await result.current.submitPayment({});
    });

    act(() => result.current.reset());
    expect(result.current.status).toBe('idle');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
