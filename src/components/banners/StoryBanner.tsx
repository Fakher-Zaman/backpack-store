export default function StoryBanner() {
  return (
    <section id="about" className="bg-brand-green-dark py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <div className="text-white">
            <h2 className="font-display text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
              The secret behind our
              backpack&apos;s comfort
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              The Backpack is Designed For Those Who Are Active, Confident And Appreciate Functional Design Without
              Sacrificing Style. With High-Quality Materials And Ergodic
              Design Focus, This Pack Is Ready To Accompany You On Any
              Escapade From Your Office To A Weekend Trip.
            </p>
          </div>

          {/* Right: image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1509762774605-f07235a08f1f?w=600&h=400&fit=crop"
              alt="Backpack comfort details"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
