export default function FeatureSection() {
  return (
    <section className="bg-brand-cream py-20 dark:bg-brand-dark-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left: text */}
        <div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-5xl lg:text-6xl dark:text-gray-100">
            Find the
            <br />
            backpack
            <br />
            of your
            <br />
            choice
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Experience the benefits of top backpacks for health,
            combining superior energy boost with wellness-
            enhancing for optimal performance.
          </p>
          <button
            className="mt-8 flex items-center gap-2 rounded-md bg-brand-green-dark
              px-5 py-3 text-xs font-medium text-white transition-colors
              hover:bg-brand-green"
          >
            Explore More
          </button>
        </div>

        {/* Right: image */}
        <div className="relative">
          <img
            src="https://picsum.photos/seed/feature-model/600/700"
            alt="Model wearing Piccollo backpack"
            loading="lazy"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
