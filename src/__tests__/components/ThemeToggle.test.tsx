import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '@/hooks/useTheme';
import ThemeToggle from '@/components/ui/ThemeToggle';

const STORAGE_KEY = 'piccollo-theme';

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

describe('ThemeToggle', () => {
  it('renders a button', () => {
    renderWithTheme();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows "Switch to dark mode" label in light mode', () => {
    renderWithTheme();
    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' }),
    ).toBeInTheDocument();
  });

  it('shows "Switch to light mode" label in dark mode', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    renderWithTheme();
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeInTheDocument();
  });

  it('shows moon icon in light mode (aria-hidden svg)', () => {
    renderWithTheme();
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Moon path contains the distinctive "20.354" coordinate
    const path = svg!.querySelector('path');
    expect(path?.getAttribute('d')).toContain('20.354');
  });

  it('shows sun icon in dark mode (aria-hidden svg)', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    renderWithTheme();
    const svg = screen.getByRole('button').querySelector('svg');
    const path = svg!.querySelector('path');
    // Sun path contains "M12 3v1" coordinate
    expect(path?.getAttribute('d')).toContain('M12 3v1');
  });

  it('toggles theme on click', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole('button', { name: 'Switch to dark mode' });
    await user.click(button);

    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light on second click', async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);

    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' }),
    ).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
