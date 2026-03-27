import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Sparkles, BookOpen } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

const About = () => {
  useSEO({
    title: "About E-Woman Conference | Women Leadership Platform — Yaoundé, Cameroon",
    description:
      "E-Woman Conference is a Spirit-led women's leadership platform founded by Pst. Delphine Nforgwei. Equipping women across Cameroon and the world to rise in identity, authority, and kingdom influence.",
    canonical: "/about",
  });

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0810 0%, #2d0a1f 60%, #1a0810 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #d4198a 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#e0c55d" }}>
            About
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            E-Woman Conference
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/85 text-lg leading-relaxed">
            A Spirit-led women's leadership platform equipping women to rise in identity,
            spiritual authority, and kingdom influence — across Cameroon and the world.
          </p>
        </div>
      </section>

      <div className="container px-4 max-w-4xl mx-auto py-20 space-y-20">

        {/* Mission */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>Our Mission</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-white">
            What E-Woman Conference Is
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <div className="space-y-4 text-white/85 text-base leading-relaxed">
            <p>
              E-Woman Conference is a Spirit-led women's leadership platform rooted in Pentecostal
              conviction and biblical truth. Founded by Pst. Delphine Nforgwei — pastor, purpose coach,
              and author — the conference calls women to align with divine purpose and lead with clarity
              and excellence.
            </p>
            <p>
              Every year, women from Cameroon, the United States, and across the globe gather for two
              days of worship, teaching, prophetic impartation, and leadership development. E-Woman is
              not a secular empowerment event. It is a convergence of women who know their authority is
              borrowed from heaven — and who are ready to walk in it fully.
            </p>
            <p>
              Through authorship, mentorship, and transformational dialogue, E-Woman builds a continuum
              of wisdom that extends far beyond the conference hall into communities, families, and nations.
            </p>
          </div>
        </section>

        {/* Four Pillars */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-white">
            What Makes E-Woman Distinct
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <Sparkles size={20} />,
                title: "Spirit-Led Platform",
                body: "Every session is rooted in Pentecostal conviction and biblical truth — held to a standard of spiritual integrity and kingdom purpose.",
              },
              {
                icon: <BookOpen size={20} />,
                title: "Authorship & Mentorship",
                body: "Through books, teachings, and direct mentorship, E-Woman creates a wisdom continuum that extends far beyond the conference hall.",
              },
              {
                icon: <Users size={20} />,
                title: "Transformational Dialogue",
                body: "Real conversations about identity, resilience, marriage, fatherlessness, and purpose — delivered with transparency, grace, and prophetic authority.",
              },
              {
                icon: <Heart size={20} />,
                title: "Global Community",
                body: "Women from Cameroon, the United States, Europe, and across Africa join together — forming a sisterhood that crosses borders and builds legacy.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border border-white/10 space-y-3"
                style={{ background: "rgba(212,25,138,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #d4198a, #ff33aa)", color: "#fff" }}
                >
                  {p.icon}
                </div>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>Founder & Convener</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-white">
            Pst. Delphine Nforgwei
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <div className="space-y-4 text-white/85 text-base leading-relaxed">
            <p>
              Pst. Delphine Nforgwei is a pastor, purpose coach, author, and the visionary founder of
              E-Woman Conference. Her mission is to see women rise fully in every dimension of their
              God-given identity — spiritually, professionally, and relationally.
            </p>
            <p>
              She has ministered across Cameroon and the United States, and continues to mentor women
              through books, coaching sessions, and the E-Woman platform. Her leadership has shaped
              hundreds of women into leaders who are building legacy in their homes, churches, and
              communities.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-wrap gap-4 pt-4">
          <Link
            to="/conference"
            className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-full transition hover:scale-105"
            style={{ background: "#d4198a", color: "#fff" }}
          >
            The Conference <ArrowRight size={15} />
          </Link>
          <Link
            to="/2026-edition"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition"
          >
            2026 Edition <ArrowRight size={15} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition"
          >
            Contact Us <ArrowRight size={15} />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default About;
