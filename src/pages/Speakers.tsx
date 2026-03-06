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
          <p className="reveal reveal-delay-1 mt-4 text-white font-medium text-lg max-w-2xl mx-auto">
            Meet the visionary women shaping the conversations at{" "}
            <span className="text-white font-bold">{c.site.name}</span>.
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
                className="reveal overflow-hidden group transition-all block rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s`, background: "#ffffff" }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-t-2xl">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-1" style={{ color: "#1a001f" }}>
                    {speaker.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: "rgba(26,0,31,0.65)" }}>
                    {speaker.title}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#d4198a" }}>
                    {speaker.topic}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE STICKY REGISTER */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 p-4 z-50">
        <Link
          to="/register"
          className="block w-full text-center bg-white !text-magenta py-3 rounded-full font-semibold text-lg shadow-lg"
          style={{ color: "#d4198a" }}
        >
          Secure Your Seat – 50,000 FCFA
        </Link>
      </div>
    </div>
  );
};

export default Speakers;
