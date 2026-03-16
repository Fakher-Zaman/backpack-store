export default function PromoBanner() {
  return (
    <section id="campaigns" className="bg-brand-cream py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Save 20% or more
              <br />
              on Energy Drinks
            </h2>
            <p className="mt-4 max-w-md text-sm text-gray-600">
              Unlock Savings. Get 20% or More Off Your
              Favorite Energy Drinks.
            </p>
            <button
              className="mt-6 rounded-md bg-brand-green-dark px-6 py-3
                text-xs font-medium text-white transition-colors
                hover:bg-brand-green"
            >
              Shop Now
            </button>
          </div>
          <div className="flex justify-end">
            <img
              src="https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&h=350&fit=crop"
              alt="Promotional backpack"
              loading="lazy"
              className="w-full max-w-md rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
