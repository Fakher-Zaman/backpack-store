import { faqItems } from '@/data/faq';
import Accordion from '@/components/ui/Accordion';

export default function FaqPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-gray-600">
          Everything you need to know about our products, shipping, and policies.
        </p>
        <div className="mt-12">
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  );
}
