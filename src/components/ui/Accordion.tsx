import { useState } from 'react';

interface AccordionItem {
  id: number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-gray-200">
      {items.map(item => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-5 text-left
                text-sm font-semibold text-gray-900 transition-colors
                hover:text-brand-green-dark"
            >
              {item.question}
              <svg
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <p className="pb-5 text-sm leading-relaxed text-gray-600">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
