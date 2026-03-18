import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider } from '@/hooks/useCart';
import { ReviewsProvider } from '@/hooks/useReviews';
import { WishlistProvider } from '@/hooks/useWishlist';
import QuickViewModal from '@/components/products/QuickViewModal';
import type { Product } from '@/types';

const mockProduct: Product = {
  id: 1,
  name: 'Trail Explorer Pack',
  price: 89.99,
  originalPrice: 119.99,
  image: '/images/trail-pack.jpg',
  rating: 4.5,
  colors: ['#2C2C2C', '#5C4033'],
  category: 'backpack',
  description: 'A rugged backpack built for the trail.',
};

function renderModal(props: Partial<{ isOpen: boolean; onClose: () => void; product: Product }> = {}) {
  const onClose = props.onClose ?? vi.fn();
  return {
    onClose,
    ...render(
      <WishlistProvider>
        <CartProvider>
          <ReviewsProvider>
            <QuickViewModal
              product={props.product ?? mockProduct}
              isOpen={props.isOpen ?? true}
              onClose={onClose}
            />
          </ReviewsProvider>
        </CartProvider>
      </WishlistProvider>,
    ),
  };
}

describe('QuickViewModal', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders product details when open', () => {
    renderModal();
    expect(screen.getByText('Trail Explorer Pack')).toBeInTheDocument();
    expect(screen.getByText('$89.99')).toBeInTheDocument();
    expect(screen.getByText(/A rugged backpack/)).toBeInTheDocument();
    expect(screen.getByText('25% OFF')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByText('Trail Explorer Pack')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByLabelText('Close quick view'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('renders color swatches and allows selection', async () => {
    const user = userEvent.setup();
    renderModal();
    const swatches = screen.getAllByRole('radio');
    expect(swatches).toHaveLength(2);
    expect(swatches[0]).toHaveAttribute('aria-checked', 'true');

    await user.click(swatches[1]);
    expect(swatches[1]).toHaveAttribute('aria-checked', 'true');
    expect(swatches[0]).toHaveAttribute('aria-checked', 'false');
  });

  it('increments and decrements quantity', async () => {
    const user = userEvent.setup();
    renderModal();
    expect(screen.getByText('1')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Increase quantity'));
    expect(screen.getByText('2')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Decrease quantity'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('does not decrement below 1', () => {
    renderModal();
    const decreaseBtn = screen.getByLabelText('Decrease quantity');
    expect(decreaseBtn).toBeDisabled();
  });

  it('adds item to cart and closes modal on Add to Cart click', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();

    await user.click(screen.getByLabelText('Increase quantity'));
    await user.click(screen.getByText(/Add to Cart/));

    expect(onClose).toHaveBeenCalled();
    const cart = JSON.parse(localStorage.getItem('piccollo-cart') ?? '[]');
    expect(cart).toEqual([{ productId: 1, quantity: 2 }]);
  });

  it('renders without colors when product has none', () => {
    renderModal({ product: { ...mockProduct, colors: undefined } });
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
  });

  it('has correct aria attributes for dialog', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'quick-view-title');
  });
});
