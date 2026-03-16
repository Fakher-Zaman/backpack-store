import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from '@/hooks/useAuth';
import { WishlistProvider } from '@/hooks/useWishlist';
import Dashboard from '@/components/auth/Dashboard';

vi.mock('@/lib/auth', () => ({
  loginUser: vi.fn(),
  logoutUser: vi.fn().mockResolvedValue(undefined),
}));

function renderDashboard(isOpen: boolean, onClose = vi.fn()) {
  // Pre-seed auth user in localStorage
  localStorage.setItem(
    'piccollo-auth-user',
    JSON.stringify({ id: '1', name: 'Alice', email: 'alice@example.com' }),
  );
  return {
    onClose,
    ...render(
      <AuthProvider>
        <WishlistProvider>
          <Dashboard isOpen={isOpen} onClose={onClose} />
        </WishlistProvider>
      </AuthProvider>,
    ),
  };
}

describe('Dashboard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders nothing when closed', () => {
    renderDashboard(false);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('renders user info when open', () => {
    renderDashboard(true);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome back, Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('shows wishlist count', () => {
    localStorage.setItem('piccollo-wishlist', JSON.stringify([1, 2, 3]));
    renderDashboard(true);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onClose when Back to Store is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = renderDashboard(true);
    await user.click(screen.getByText('Back to Store'));
    expect(onClose).toHaveBeenCalled();
  });
});
