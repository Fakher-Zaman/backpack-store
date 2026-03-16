import { describe, it, expect } from 'vitest';
import { loginUser } from '@/lib/auth';

describe('loginUser (mock mode)', () => {
  it('returns user and token for valid credentials', async () => {
    const result = await loginUser({ email: 'test@example.com', password: 'secret123' });
    expect(result.user.email).toBe('test@example.com');
    expect(result.user.name).toBe('test');
    expect(result.user.id).toBe('1');
    expect(result.token).toMatch(/^mock-token-/);
  });

  it('throws ZodError for invalid email', async () => {
    await expect(loginUser({ email: 'bad', password: 'secret123' })).rejects.toThrow();
  });

  it('throws ZodError for short password', async () => {
    await expect(loginUser({ email: 'a@b.com', password: '12345' })).rejects.toThrow();
  });

  it('throws ZodError for missing fields', async () => {
    await expect(loginUser({})).rejects.toThrow();
  });
});
