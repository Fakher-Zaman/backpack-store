import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

vi.mock('@/lib/auth', () => ({
  loginUser: vi.fn(),
  logoutUser: vi.fn().mockResolvedValue(undefined),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows default fallback when not authenticated', () => {
    render(
      <AuthProvider>
        <ProtectedRoute>
          <div>Secret</div>
        </ProtectedRoute>
      </AuthProvider>,
    );
    expect(screen.queryByText('Secret')).not.toBeInTheDocument();
    expect(screen.getByText('Please log in to access this page.')).toBeInTheDocument();
  });

  it('shows custom fallback when not authenticated', () => {
    render(
      <AuthProvider>
        <ProtectedRoute fallback={<div>Custom Fallback</div>}>
          <div>Secret</div>
        </ProtectedRoute>
      </AuthProvider>,
    );
    expect(screen.getByText('Custom Fallback')).toBeInTheDocument();
    expect(screen.queryByText('Secret')).not.toBeInTheDocument();
  });

  it('shows children when authenticated', () => {
    localStorage.setItem(
      'piccollo-auth-user',
      JSON.stringify({ id: '1', name: 'Test', email: 'test@test.com' }),
    );
    render(
      <AuthProvider>
        <ProtectedRoute>
          <div>Secret</div>
        </ProtectedRoute>
      </AuthProvider>,
    );
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });
});
