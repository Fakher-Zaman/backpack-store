import { faqItems } from '@/data/faq';
import Accordion from '@/components/ui/Accordion';
import AnimatedPage from '@/components/ui/AnimatedPage';
import type { ReactNode } from 'react';

export default function FaqPage(): ReactNode {
  return (
    <AnimatedPage>
      <div className="pt-24">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="font-display text-4xl font-bold dark:text-gray-100 md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Everything you need to know about our products, shipping, and policies.
          </p>
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
