import { Mail, MessageCircle, BookOpen, Mic, Users } from "lucide-react";

const WA_NUMBER = "237683493220";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello, I am a media professional interested in E-WOMAN 2026")}`;

const pillars = [
  {
    icon: <Mic size={22} />,
    title: "Spirit-Led Platform",
    text: "Rooted in Pentecostal conviction and biblical truth. Every session, every voice, every word is held to a standard of spiritual integrity and kingdom purpose.",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Authorship & Mentorship",
    text: "Through books, teachings, and direct mentorship, E-Woman creates a continuum of wisdom that extends far beyond the conference hall.",
  },
  {
    icon: <Users size={22} />,
    title: "Transformational Dialogue",
    text: "Real conversations about identity, resilience, marriage, fatherlessness, and purpose — delivered with transparency, grace, and prophetic authority.",
  },
];

const Media = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0810 0%, #2d0a1f 60%, #1a0810 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 70% 40%, #d4198a 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#e0c55d" }}>
            Media &amp; Press
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            E-Woman Conference
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white text-lg leading-relaxed">
            A Spirit-led women's leadership platform rooted in Pentecostal conviction and biblical truth.
          </p>
        </div>
      </section>

      <div className="container px-4 max-w-4xl mx-auto py-20 space-y-20">

        {/* Short Description */}
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            Short Description
          </p>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "#f8e8f4" }}>
            About E-Woman Conference
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <p className="text-white text-lg leading-relaxed">
            E-Woman Conference is a Spirit-led women's leadership platform rooted in Pentecostal
            conviction and biblical truth. It equips women to rise in identity, spiritual authority,
            resilience, and kingdom influence.
          </p>
        </section>

        {/* Long Description */}
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            Full Description
          </p>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "#f8e8f4" }}>
            The Full Story
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <div className="space-y-4 text-white leading-relaxed text-base">
            <p>
              Through authorship, mentorship, and transformational dialogue, E-Woman calls women to
              align with divine purpose and lead with clarity and excellence. Founded by Pst. Delphine
              Nforgwei — pastor, purpose coach, and author — the conference has gathered women across
              Cameroon and the United States, creating a movement that refuses to be ordinary.
            </p>
            <p>
              E-Woman 2026 — <em>The Excelling Woman</em> — convenes on March 13–14, 2026 at the Hilton
              Hotel, Yaoundé, Cameroon. It brings together over 500 women and 12+ speakers for two days
              of worship, teaching, and prophetic impartation.
            </p>
            <p>
              This is not a secular empowerment event. This is a convergence of women who know that their
              authority is borrowed from heaven — and who are ready to walk in it fully.
            </p>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="reveal">
          <h2 className="font-display text-2xl font-bold mb-8 text-white">What Makes E-Woman Distinct</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
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
                <p className="text-white text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Gallery */}
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            Conference Videos
          </p>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "#f8e8f4" }}>
            E-Woman Conference 2026 — Highlights
          </h2>
          <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
          <p className="text-white/80 text-base leading-relaxed mb-8">
            Relive the powerful moments from E-Woman Conference 2026. These short videos capture the energy,
            worship, and transformation that took place over two incredible days.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Ns0AI7IN6YA",
              "xtpgB6gxJgo",
              "wKpD4lWqAAU",
              "BedXwqwsZbM",
              "MgqIGusls3w",
              "2XP0vviYUkg",
              "bw4nWLAs2CY",
              "jH5H0auX9u8",
              "GMYwILN1-7M",
              "ZlJD_0ljufM",
              "zfKVe1m9Jww",
              "jwlICGQ6wZI",
              "_MoTaT3Yl5k",
              "sVfHGI24i1w",
              "vXAooeQ0UX4",
              "7NIYcQ3qlKI",
            ].map((id) => (
              <div
                key={id}
                className="rounded-xl overflow-hidden border border-white/10"
                style={{ aspectRatio: "9/16", background: "#0f0014" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                  title={`E-Woman Conference 2026 — ${id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Media Contact */}
        <section className="reveal">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1f0414, #2d0a1f)" }}
          >
            <div
              className="px-6 py-4"
              style={{ background: "linear-gradient(90deg, #d4198a, #c0157c)" }}
            >
              <h2 className="font-display text-xl font-bold text-white">Media Contact</h2>
            </div>
            <div className="p-8 space-y-5">
              <p className="text-white leading-relaxed">
                For press enquiries, interview requests, or media accreditation, reach the E-Woman
                Media Team directly.
              </p>
              <div className="space-y-4">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-[#ff33aa] transition group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #e0c55d, #a87e02)" }}
                  >
                    <MessageCircle size={18} className="text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-white mb-0.5">WhatsApp</p>
                    <p className="font-semibold text-sm">+237 6 83 49 32 20</p>
                  </div>
                </a>
                <a
                  href="mailto:info@e-womanconference.online"
                  className="flex items-center gap-3 text-white hover:text-[#ff33aa] transition group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #e0c55d, #a87e02)" }}
                  >
                    <Mail size={18} className="text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-white mb-0.5">Email</p>
                    <p className="font-semibold text-sm">info@e-womanconference.online</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Media;
