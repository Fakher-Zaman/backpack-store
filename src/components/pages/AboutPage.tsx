import { brandStory, mission, values, teamMembers } from '@/data/about';

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-brand-green-dark px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            {brandStory.headline}
          </h1>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-white/80">
            {brandStory.text}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold">{mission.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            {mission.text}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">
            Our Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(v => (
              <div key={v.title} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center font-display text-3xl font-bold">
          Meet the Team
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map(member => (
            <div key={member.id} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="mx-auto h-40 w-40 rounded-full object-cover"
              />
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-sm text-brand-green-dark">{member.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
