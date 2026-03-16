import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Mock the auth service
vi.mock('@/lib/auth', () => ({
  loginUser: vi.fn(),
  logoutUser: vi.fn().mockResolvedValue(undefined),
}));

import { loginUser } from '@/lib/auth';

const mockedLoginUser = vi.mocked(loginUser);

// Test component that exposes auth state
function AuthTestConsumer() {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth();
  return (
    <div>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="user">{user?.email ?? 'none'}</span>
      {error && <span data-testid="error">{error}</span>}
      <button onClick={() => login('test@example.com', 'password123').catch(() => {})}>Login</button>
      <button onClick={() => login('bad', 'short').catch(() => {})}>Bad Login</button>
      <button onClick={() => login('test@example.com', 'wrong-password').catch(() => {})}>Wrong Password</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function renderWithAuth(ui: React.ReactNode) {
  return render(<AuthProvider>{ui}</AuthProvider>);
}

describe('Auth Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('logs in with valid credentials', async () => {
    mockedLoginUser.mockResolvedValue({
      user: { id: '1', name: 'test', email: 'test@example.com' },
      token: 'mock-token',
    });

    renderWithAuth(<AuthTestConsumer />);
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');

    await userEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
    expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
  });

  it('shows error on login failure (wrong password)', async () => {
    mockedLoginUser.mockRejectedValue(new Error('Invalid credentials'));

    renderWithAuth(<AuthTestConsumer />);

    await userEvent.click(screen.getByText('Wrong Password'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials');
    });
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('shows error on login failure (invalid email format)', async () => {
    mockedLoginUser.mockRejectedValue(new Error('Invalid email address'));

    renderWithAuth(<AuthTestConsumer />);

    await userEvent.click(screen.getByText('Bad Login'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid email address');
    });
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('clears auth state on logout', async () => {
    mockedLoginUser.mockResolvedValue({
      user: { id: '1', name: 'test', email: 'test@example.com' },
      token: 'mock-token',
    });

    renderWithAuth(<AuthTestConsumer />);

    await userEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    await userEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    });
    expect(screen.getByTestId('user')).toHaveTextContent('none');
  });

  it('ProtectedRoute shows fallback when not authenticated', () => {
    renderWithAuth(
      <ProtectedRoute>
        <div>Secret Content</div>
      </ProtectedRoute>,
    );

    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
    expect(screen.getByText('Please log in to access this page.')).toBeInTheDocument();
  });

  it('ProtectedRoute shows children when authenticated', async () => {
    mockedLoginUser.mockResolvedValue({
      user: { id: '1', name: 'test', email: 'test@example.com' },
      token: 'mock-token',
    });

    renderWithAuth(
      <>
        <AuthTestConsumer />
        <ProtectedRoute>
          <div>Secret Content</div>
        </ProtectedRoute>
      </>,
    );

    await userEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByText('Secret Content')).toBeInTheDocument();
    });
  });
});
