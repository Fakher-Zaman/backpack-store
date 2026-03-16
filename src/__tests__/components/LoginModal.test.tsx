import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from '@/hooks/useAuth';
import LoginModal from '@/components/auth/LoginModal';

vi.mock('@/lib/auth', () => ({
  loginUser: vi.fn(),
  logoutUser: vi.fn().mockResolvedValue(undefined),
}));

import { loginUser } from '@/lib/auth';
const mockedLoginUser = vi.mocked(loginUser);

function renderModal(isOpen = true, onClose = vi.fn()) {
  return {
    onClose,
    ...render(
      <AuthProvider>
        <LoginModal isOpen={isOpen} onClose={onClose} />
      </AuthProvider>,
    ),
  };
}

describe('LoginModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders nothing when closed', () => {
    renderModal(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    renderModal(true);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows validation error for short password with empty email', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByLabelText(/password/i), '12345');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('calls onClose after successful login', async () => {
    mockedLoginUser.mockResolvedValue({
      user: { id: '1', name: 'test', email: 'test@example.com' },
      token: 'tok',
    });
    const user = userEvent.setup();
    const { onClose } = renderModal();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('shows form error on login failure', async () => {
    mockedLoginUser.mockRejectedValue(new Error('bad'));
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Invalid email or password. Please try again.',
      );
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByLabelText('Close login'));
    expect(onClose).toHaveBeenCalled();
  });
});
