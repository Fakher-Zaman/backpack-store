import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/types/contact.types';
import { contactInfo } from '@/data/contact';
import type { ContactFormInput } from '@/types/contact.types';

export default function ContactPage() {
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
    // Simulate sending — replace with real API call later
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
    reset();
  };

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-xl text-gray-600">
          Have a question, feedback, or a custom order request? We&apos;d love to
          hear from you.
        </p>

        <div className="mt-12 grid gap-16 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-xl bg-green-50 p-8 text-center">
                <h2 className="text-xl font-semibold text-green-800">
                  Message sent!
                </h2>
                <p className="mt-2 text-sm text-green-700">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm font-medium text-brand-green-dark underline"
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
                  <label htmlFor="name" className="mb-1 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register('name')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                      outline-none focus:border-brand-green-dark focus:ring-1
                      focus:ring-brand-green-dark"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                      outline-none focus:border-brand-green-dark focus:ring-1
                      focus:ring-brand-green-dark"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    {...register('subject')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                      outline-none focus:border-brand-green-dark focus:ring-1
                      focus:ring-brand-green-dark"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                      outline-none focus:border-brand-green-dark focus:ring-1
                      focus:ring-brand-green-dark"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-brand-green-dark px-8 py-3 text-sm
                    font-semibold uppercase tracking-wider text-white transition-colors
                    hover:bg-brand-green disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold">Address</h3>
              <p className="mt-1 text-sm text-gray-600">{contactInfo.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Email</h3>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-1 block text-sm text-brand-green-dark hover:underline"
              >
                {contactInfo.email}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Phone</h3>
              <p className="mt-1 text-sm text-gray-600">{contactInfo.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Hours</h3>
              <p className="mt-1 text-sm text-gray-600">{contactInfo.hours}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Follow Us</h3>
              <div className="mt-2 flex gap-3">
                {contactInfo.socials.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-green-dark hover:underline"
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
  );
}
