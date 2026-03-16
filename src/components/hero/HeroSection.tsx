const thumbnails = [
  { id: 'canvas', src: 'photo-1622560480605-d83c853bc5c3', alt: 'Canvas backpack close-up' },
  { id: 'leather', src: 'photo-1548036328-c9fa89d128fa', alt: 'Leather backpack detail' },
  { id: 'minimal', src: 'photo-1581605405669-fcdf81165afa', alt: 'Minimalist day pack' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-brand-green-dark overflow-hidden">
      {/* Large PICCOLLO text */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24">
        <h1
          className="font-display text-[8vw] font-bold leading-none
            tracking-tight text-white md:text-[7rem] lg:text-[9rem]"
        >
          PICCOLLO
        </h1>
      </div>

      {/* Hero content area */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* Left: large backpack image */}
          <div className="relative -mt-16 md:-mt-24">
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop"
              alt="Featured Piccollo backpack"
              className="mx-auto h-[60vh] md:h-[70vh] w-auto object-contain"
            />
            {/* Play button overlay */}
            <button
              className="absolute bottom-32 left-8 flex items-center gap-2
                rounded-full bg-white/10 px-4 py-2 text-sm text-white
                backdrop-blur-sm transition hover:bg-white/20"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-green-dark">
                <svg
                  className="h-3 w-3 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-xs font-medium">Shop Now</span>
            </button>
          </div>

          {/* Right: thumbnails + description */}
          <div className="pb-12 lg:pb-20">
            {/* Small product thumbnails */}
            <div className="mb-6 flex gap-3">
              {thumbnails.map(thumb => (
                <div
                  key={thumb.id}
                  className="h-20 w-20 overflow-hidden rounded-lg border border-white/20"
                >
                  <img
                    src={`https://images.unsplash.com/${thumb.src}?w=100&h=100&fit=crop`}
                    alt={thumb.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Discover a premium backpack collection that combines
              elegant style, robust construction, and advanced
              functionality for today&apos;s adventurers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
