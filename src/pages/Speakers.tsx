import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";

const Speakers = () => {
  const { content } = useContent();
  const c = content!;

  return (
    <div className="min-h-screen">
      {/* Hero - Typography Only */}
      <section className="pt-32 pb-16 text-center gradient-magenta">
        <div className="container px-4">
          <h1 className="reveal font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Our Speakers
          </h1>
          <p className="reveal reveal-delay-1 mt-4 text-foreground/70 text-lg max-w-2xl mx-auto">
            Meet the visionary women shaping the conversations at{" "}
            <span className="text-accent font-medium">{c.site.name}</span>.
          </p>
        </div>
      </section>

      {/* Speakers Flyer Image */}
      <section className="py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-[900px]">
            <img
              src="/images/all-speakers.jpeg"
              alt="E-WOMAN 2026 Speakers"
              className="w-full h-auto rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Speaker Grid */}
      <section className="pb-24 pt-8">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.speakers.map((speaker: any, index: number) => (
              <Link
                key={speaker.slug}
                to={`/speakers/${speaker.slug}`}
                className={`reveal glass-card overflow-hidden group hover:bg-white/15 transition-all block`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-2">
                    {speaker.title}
                  </p>
                  <p className="text-sm text-accent">
                    {speaker.topic}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Speakers;
