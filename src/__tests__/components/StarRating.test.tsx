import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StarRating from '@/components/ui/StarRating';

describe('StarRating', () => {
  it('renders with correct aria-label', () => {
    render(<StarRating rating={3.5} />);
    expect(screen.getByRole('img')).toHaveAttribute(
      'aria-label',
      'Rating: 3.5 out of 5 stars',
    );
  });

  it('renders 5 star SVGs', () => {
    const { container } = render(<StarRating rating={4} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(5);
  });

  it('applies filled color to stars up to the rating', () => {
    const { container } = render(<StarRating rating={3} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0].getAttribute('class')).toContain('text-yellow-400');
    expect(svgs[2].getAttribute('class')).toContain('text-yellow-400');
    expect(svgs[3].getAttribute('class')).toContain('text-gray-300');
    expect(svgs[4].getAttribute('class')).toContain('text-gray-300');
  });

  it('renders zero filled stars for rating 0', () => {
    const { container } = render(<StarRating rating={0} />);
    const svgs = container.querySelectorAll('svg');
    svgs.forEach(svg => {
      expect(svg.getAttribute('class')).toContain('text-gray-300');
    });
  });
});
