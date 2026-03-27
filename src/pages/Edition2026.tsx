import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Users, CheckCircle, ClipboardList } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

const STATS = [
  { number: "500+", label: "Women Attended" },
  { number: "12+",  label: "Speakers" },
  { number: "2",    label: "Days" },
  { number: "2",    label: "Continents" },
];

const Edition2026 = () => {
  useSEO({
    title: "E-Woman Conference 2026 | The Excelling Woman — Yaoundé, Cameroon",
    description:
      "E-Woman Conference 2026 — The Excelling Woman — took place March 13–14, 2026 at the Hilton Hotel, Yaoundé, Cameroon. 500+ women, 12+ speakers, 2 days of transformation.",
    canonical: "/2026-edition",
  });

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #12000f 0%, #220133 50%, #12000f 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,25,138,0.20) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(224,197,93,0.12)", color: "#e0c55d", border: "1px solid rgba(224,197,93,0.25)" }}
          >
            Conference Completed
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
            E-Woman Conference 2026
          </h1>
          <p className="font-display text-xl sm:text-2xl font-semibold mb-5" style={{ color: "#ff77c2" }}>
            The Excelling Woman
          </p>
          <div className="gold-divider mb-6" />
          <div className="flex flex-wrap justify-center gap-5 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Calendar size={15} style={{ color: "#e0c55d" }} />
              March 13–14, 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={15} style={{ color: "#e0c55d" }} />
              Hilton Hotel, Yaoundé, Cameroon
            </span>
            <span className="flex items-center gap-2">
              <Users size={15} style={{ color: "#e0c55d" }} />
              500+ Women
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-b border-white/10" style={{ background: "#0e0012" }}>
        <div className="container px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl py-6 px-3 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="font-display text-3xl font-bold mb-1" style={{ color: "#d4198a" }}>{s.number}</div>
                <div className="text-xs font-medium text-white/60 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-4 max-w-4xl mx-auto py-20 space-y-20">

        {/* About the Edition */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>The 2026 Edition</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-white">
            The Excelling Woman
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <div className="space-y-4 text-white/85 text-base leading-relaxed">
            <p>
              E-Woman Conference 2026, themed <em>The Excelling Woman</em>, convened on March 13–14,
              2026 at the prestigious Hilton Hotel in Yaoundé, Cameroon. This edition brought together
              over 500 women and 12+ internationally recognized speakers for two days of worship,
              teaching, and prophetic impartation.
            </p>
            <p>
              The 2026 edition was the largest and most impactful gathering in the history of E-Woman
              Conference, drawing attendees from Cameroon, the United States, France, the United Kingdom,
              and other parts of Africa and the world.
            </p>
            <p>
              Keynote sessions, leadership panels, author showcases, networking breakfasts, award
              ceremonies, and late-night worship services filled the two days with moments that attendees
              described as life-changing.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-white">
            Conference Highlights
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "500+ women from across Cameroon and the world",
              "12+ keynote speakers and ministry leaders",
              "2 full days of sessions, workshops, and networking",
              "Inspiring testimonies and prophetic ministry",
              "Awards and recognition ceremony",
              "Author exhibition and book launches",
              "Networking dinners and community building",
              "Live worship and spiritual empowerment",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl px-5 py-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,25,138,0.12)" }}
              >
                <CheckCircle size={16} style={{ color: "#d4198a", flexShrink: 0, marginTop: 2 }} />
                <p className="text-white/85 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Venue */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>Venue</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-white">
            Hilton Hotel, Yaoundé
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <p className="text-white/85 text-base leading-relaxed">
            The 2026 edition was hosted at the Hilton Hotel in Yaoundé, Cameroon — one of the city's
            premier venues known for its international-standard facilities. The venue provided the
            perfect setting for a conference of this scale and significance, offering grand conference
            halls, elegant networking spaces, and world-class hospitality.
          </p>
        </section>

        {/* CTAs */}
        <section className="flex flex-wrap gap-4 pt-4">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-full transition hover:scale-105"
            style={{ background: "#d4198a", color: "#fff" }}
          >
            View Gallery <ArrowRight size={15} />
          </Link>
          <Link
            to="/media"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition"
          >
            Watch Videos <ArrowRight size={15} />
          </Link>
          <Link
            to="/evaluation"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition"
          >
            <ClipboardList size={15} />
            Conference Evaluation
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Edition2026;
