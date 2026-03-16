import { useState } from 'react';
import ReviewModal from '@/components/ui/ReviewModal';

const SIZES = [
  {
    name: 'Small',
    capacity: '15–20L',
    dimensions: '40 × 28 × 15 cm',
    laptop: 'Up to 13"',
    bestFor: 'Day trips, commuting',
  },
  {
    name: 'Medium',
    capacity: '20–30L',
    dimensions: '46 × 32 × 18 cm',
    laptop: 'Up to 15"',
    bestFor: 'School, work, weekend trips',
  },
  {
    name: 'Large',
    capacity: '30–40L',
    dimensions: '52 × 34 × 22 cm',
    laptop: 'Up to 17"',
    bestFor: 'Travel, hiking, overnight',
  },
  {
    name: 'Extra Large',
    capacity: '40–50L',
    dimensions: '60 × 36 × 26 cm',
    laptop: 'Up to 17"',
    bestFor: 'Multi-day trips, camping',
  },
];

const TIPS = [
  { label: 'Torso length', text: 'Measure from C7 vertebra to the iliac crest for the best fit.' },
  { label: 'Daily carry', text: 'A 20–25L pack fits a laptop, lunch, and essentials comfortably.' },
  { label: 'Travel', text: 'Choose 30L+ for overnight trips. Most airlines accept up to 40L as carry-on.' },
];

export default function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open size guide"
        className="inline-flex items-center gap-1.5 text-xs font-medium
          text-brand-green transition-colors hover:text-brand-green-dark"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        Size Guide
      </button>

      <ReviewModal isOpen={open} onClose={() => setOpen(false)} title="Backpack Size Guide">
        {/* Size comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Size
                </th>
                <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Capacity
                </th>
                <th
                  className="hidden pb-2 pr-4 text-xs font-semibold uppercase
                    tracking-wide text-gray-500 sm:table-cell"
                >
                  Dimensions
                </th>
                <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Laptop
                </th>
                <th
                  className="hidden pb-2 text-xs font-semibold uppercase
                    tracking-wide text-gray-500 sm:table-cell"
                >
                  Best For
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map(size => (
                <tr key={size.name} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-brand-charcoal">{size.name}</td>
                  <td className="py-3 pr-4 text-gray-600">{size.capacity}</td>
                  <td className="hidden py-3 pr-4 text-gray-600 sm:table-cell">{size.dimensions}</td>
                  <td className="py-3 pr-4 text-gray-600">{size.laptop}</td>
                  <td className="hidden py-3 text-gray-600 sm:table-cell">{size.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visual bar comparison */}
        <div className="mt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Capacity Comparison
          </h3>
          <div className="space-y-2">
            {SIZES.map(size => {
              const max = 50;
              const mid = parseInt(size.capacity.split('–')[1] || size.capacity, 10);
              const pct = (mid / max) * 100;
              return (
                <div key={size.name} className="flex items-center gap-3">
                  <span className="w-20 text-xs font-medium text-gray-600">{size.name}</span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-brand-green transition-all"
                      style={{ width: `${pct}%` }}
                      role="meter"
                      aria-label={`${size.name}: ${size.capacity}`}
                      aria-valuenow={mid}
                      aria-valuemin={0}
                      aria-valuemax={max}
                    />
                  </div>
                  <span className="w-14 text-right text-xs text-gray-400">{size.capacity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 rounded-lg bg-brand-cream/50 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-charcoal">
            Sizing Tips
          </h3>
          <ul className="space-y-1.5">
            {TIPS.map(tip => (
              <li key={tip.label} className="text-xs text-gray-600">
                <span className="font-medium text-brand-charcoal">{tip.label}:</span> {tip.text}
              </li>
            ))}
          </ul>
        </div>
      </ReviewModal>
    </>
  );
}
