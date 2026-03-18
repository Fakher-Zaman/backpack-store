import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { contactFormSchema } from '@/types/contact.types';
import { contactInfo } from '@/data/contact';
import AnimatedPage from '@/components/ui/AnimatedPage';
import type { ReactNode } from 'react';
import type { ContactFormInput } from '@/types/contact.types';

export default function ContactPage(): ReactNode {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (_data: ContactFormInput) => {
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
    reset();
  };

  const inputClasses = cn(
    'w-full rounded-lg border border-gray-300 px-4 py-3 text-sm',
    'outline-none focus:border-brand-green-dark focus:ring-1 focus:ring-brand-green-dark',
    'dark:border-brand-dark-border dark:bg-brand-dark-surface dark:text-gray-100',
    'dark:focus:border-brand-green-light dark:focus:ring-brand-green-light',
  );

  return (
    <AnimatedPage>
      <div className="pt-24">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h1 className="font-display text-4xl font-bold dark:text-gray-100 md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-400">
            Have a question, feedback, or a custom order request? We&apos;d love to
            hear from you.
          </p>

          <div className="mt-12 grid gap-16 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="rounded-xl bg-green-50 p-8 text-center dark:bg-green-900/20">
                  <h2 className="text-xl font-semibold text-green-800 dark:text-green-400">
                    Message sent!
                  </h2>
                  <p className="mt-2 text-sm text-green-700 dark:text-green-500">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm font-medium text-brand-green-dark underline dark:text-brand-green-light"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium dark:text-gray-200">
                      Name
                    </label>
                    <input id="name" {...register('name')} className={inputClasses} />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium dark:text-gray-200">
                      Email
                    </label>
                    <input id="email" type="email" {...register('email')} className={inputClasses} />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium dark:text-gray-200">
                      Subject
                    </label>
                    <input id="subject" {...register('subject')} className={inputClasses} />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium dark:text-gray-200">
                      Message
                    </label>
                    <textarea id="message" rows={5} {...register('message')} className={inputClasses} />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'rounded-full bg-brand-green-dark px-8 py-3 text-sm',
                      'font-semibold uppercase tracking-wider text-white transition-colors',
                      'hover:bg-brand-green disabled:opacity-50',
                    )}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold dark:text-gray-200">Address</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{contactInfo.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold dark:text-gray-200">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-1 block text-sm text-brand-green-dark hover:underline dark:text-brand-green-light"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold dark:text-gray-200">Phone</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{contactInfo.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold dark:text-gray-200">Hours</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{contactInfo.hours}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold dark:text-gray-200">Follow Us</h3>
                <div className="mt-2 flex gap-3">
                  {contactInfo.socials.map(s => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-green-dark hover:underline dark:text-brand-green-light"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
