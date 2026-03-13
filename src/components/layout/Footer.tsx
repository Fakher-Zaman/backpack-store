import { useState } from 'react';

const footerColumns = {
  'Pack & Accessories': ['Backpacks', 'Travel Bags', 'Accessories', 'Customize'],
  'About Us': ['Your Care', 'Privacy Policy', 'Return Policy', 'Our Story'],
};

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-brand-green-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Subscribe heading */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
              Subscribe Us
            </h2>
            {/* Email form */}
            <form
              className="mt-6 flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail('');
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-64 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-brand-cream"
                required
              />
              <button
                type="submit"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-green-dark transition hover:bg-brand-cream"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* FAQ link */}
          <div className="max-w-xs">
            <h3 className="font-semibold">Maybe Your Question is Have Been Answered, Check This Out.</h3>
            <a href="#" className="mt-2 inline-block text-xs text-white/60 underline hover:text-white">
              www.piccollo.com/faq
            </a>
          </div>
        </div>

        {/* Links columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(footerColumns).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold">{heading}</h4>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-white/60 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Legal</a>
            <a href="#" className="hover:text-white">Readable</a>
          </div>
          <p className="text-xs text-white/40">
            @2025 Copyright Eco Store - Piccollo
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {['M', 'in', 'X', 'ig'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs text-white/60 transition-colors hover:border-white hover:text-white"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
