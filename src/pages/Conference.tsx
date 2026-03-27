import { Link } from "react-router-dom";
import { ArrowRight, Mic, Users, BookOpen, Sparkles, Trophy, Heart } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

const Conference = () => {
  useSEO({
    title: "The E-Woman Conference | Women Empowerment & Leadership — Cameroon",
    description:
      "E-Woman Conference is an annual women's leadership gathering in Yaoundé, Cameroon. Two days of inspiring speakers, leadership workshops, worship, networking, and spiritual empowerment.",
    canonical: "/conference",
  });

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a001f 0%, hsl(329,70%,10%) 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,25,138,0.18) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#e0c55d" }}>
            The Conference
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            E-Woman Conference
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/85 text-lg leading-relaxed">
            An annual gathering of women rising in identity, leadership, and kingdom influence.
            Two powerful days of worship, teaching, networking, and transformation.
          </p>
        </div>
      </section>

      <div className="container px-4 max-w-4xl mx-auto py-20 space-y-20">

        {/* What It Is */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>Overview</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-white">
            What Happens at E-Woman Conference
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <div className="space-y-4 text-white/85 text-base leading-relaxed">
            <p>
              E-Woman Conference is an annual event that brings together women from across Cameroon
              and the world for two days of intensive leadership development, spiritual empowerment,
              and community building.
            </p>
            <p>
              The conference features keynote speakers, leadership panels, worship sessions, prayer
              and prophetic ministry, networking breakfasts, award ceremonies, and book exhibitions
              by women authors. Each element is carefully designed to produce lasting transformation
              in the lives of attendees.
            </p>
            <p>
              Unlike purely secular conferences, E-Woman grounds every session in faith, purpose,
              and biblical truth — creating an environment where women can be honest, vulnerable,
              and powerfully equipped at the same time.
            </p>
          </div>
        </section>

        {/* Experience Grid */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-white">
            The Conference Experience
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Mic size={22} />,
                title: "Keynote Speakers",
                body: "Internationally recognized women leaders deliver sessions on purpose, identity, leadership, and spiritual authority.",
              },
              {
                icon: <BookOpen size={22} />,
                title: "Leadership Workshops",
                body: "Practical workshops on entrepreneurship, ministry, personal development, and professional excellence.",
              },
              {
                icon: <Users size={22} />,
                title: "Networking Sessions",
                body: "Structured networking spaces where women form meaningful, lasting connections across industries and nations.",
              },
              {
                icon: <Sparkles size={22} />,
                title: "Worship & Ministry",
                body: "Powerful worship experiences and prophetic ministry that align attendees with their divine purpose.",
              },
              {
                icon: <Trophy size={22} />,
                title: "Awards & Recognition",
                body: "Women who have excelled in their fields are recognized and celebrated for their impact on community and society.",
              },
              {
                icon: <Heart size={22} />,
                title: "Community & Sisterhood",
                body: "A safe, encouraging environment where women of all backgrounds find acceptance, inspiration, and belonging.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 text-center space-y-3"
                style={{ background: "#ffffff" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ background: "linear-gradient(135deg, #d4198a, #ff33aa)", color: "#fff" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-base" style={{ color: "#1a001f" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,0,31,0.65)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who Attends */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>Attendees</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-white">Who Comes to E-Woman</h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <div className="space-y-4 text-white/85 text-base leading-relaxed">
            <p>
              E-Woman Conference welcomes all women — regardless of background, profession, or stage of life.
              Attendees include entrepreneurs, ministry leaders, students, executives, mothers, authors,
              and young professionals from Cameroon and beyond.
            </p>
            <p>
              Women travel from across Cameroon and from international cities including Washington DC,
              London, Paris, and Lagos to attend. The diversity of attendees creates a rich environment
              where different experiences, cultures, and leadership journeys intersect and strengthen each other.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            {["Entrepreneurs", "Ministry Leaders", "Professionals", "Authors", "Students", "Executives", "Mothers"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-4 py-2 rounded-full border"
                style={{ color: "#e0c55d", borderColor: "rgba(224,197,93,0.35)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-wrap gap-4 pt-4">
          <Link
            to="/2026-edition"
            className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-full transition hover:scale-105"
            style={{ background: "#d4198a", color: "#fff" }}
          >
            2026 Edition <ArrowRight size={15} />
          </Link>
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition"
          >
            View Speakers <ArrowRight size={15} />
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition"
          >
            View Gallery <ArrowRight size={15} />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Conference;
