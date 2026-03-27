import { Link } from "react-router-dom";
import { Quote, ArrowRight } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

const TESTIMONIALS = [
  {
    quote: "E-Woman Conference helped me rediscover my purpose. I came feeling lost and left knowing exactly who I am and what I am called to do.",
    name: "Conference Attendee",
    role: "Yaoundé, Cameroon",
  },
  {
    quote: "This gathering ignited something powerful in me. The worship, the speakers, the sisterhood — I have never experienced anything like it.",
    name: "Participant",
    role: "Douala, Cameroon",
  },
  {
    quote: "A life-changing experience for women of faith. I came as an attendee and left as a leader with a clear vision for my community.",
    name: "Community Leader",
    role: "Delaware, USA",
  },
  {
    quote: "I travelled all the way from the United States and it was absolutely worth every mile. E-Woman is unlike any conference I have attended.",
    name: "International Attendee",
    role: "Washington DC, USA",
  },
  {
    quote: "The E-Woman Conference 2026 was a defining moment in my journey as a woman entrepreneur. I made connections that will last a lifetime.",
    name: "Entrepreneur",
    role: "Yaoundé, Cameroon",
  },
  {
    quote: "Every session was powerful and relevant. The speakers spoke directly to my situation and gave me practical tools to move forward.",
    name: "Professional",
    role: "Cameroon",
  },
  {
    quote: "I was moved to tears during the testimony session. Seeing other women walk in victory gave me the courage to believe for my own breakthrough.",
    name: "Ministry Leader",
    role: "Cameroon",
  },
  {
    quote: "The networking was outstanding. I connected with women from across Africa and the world who are doing incredible things. Truly global.",
    name: "Business Leader",
    role: "Nigeria",
  },
  {
    quote: "Pst. Delphine and her team created an environment of genuine love and excellence. You feel seen, valued, and celebrated as a woman.",
    name: "First-Time Attendee",
    role: "Yaoundé, Cameroon",
  },
];

const Testimonials = () => {
  useSEO({
    title: "E-Woman Conference Testimonials | Women Transformed — Cameroon & Beyond",
    description:
      "Read testimonials from women who attended E-Woman Conference. Hundreds of women from Cameroon, USA, and across the world share how E-Woman transformed their lives, purpose, and leadership.",
    canonical: "/testimonials",
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
          style={{ backgroundImage: "radial-gradient(circle at 40% 60%, #d4198a 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 container px-4 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#e0c55d" }}>
            Voices from Women Impacted
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Testimonials
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/85 text-lg leading-relaxed">
            Hundreds of women have been transformed through E-Woman Conference.
            Here is what they say about the experience.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 flex flex-col shadow-sm"
                style={{ background: "#ffffff" }}
              >
                <Quote size={28} style={{ color: "#d4198a", marginBottom: 16, flexShrink: 0 }} />
                <p
                  className="font-display text-base italic leading-relaxed flex-1 mb-6"
                  style={{ color: "#1a001f" }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#d4198a" }}>— {t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(26,0,31,0.5)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #d4198a 0%, #9b0e61 100%)" }}
      >
        <div className="container px-4 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Be Part of the Next Edition
          </h2>
          <div className="gold-divider" />
          <p className="text-white/90 text-base leading-relaxed">
            The next E-Woman Conference is coming. Stay connected for updates on dates,
            speakers, and registration.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/2026-edition"
              className="inline-flex items-center gap-2 bg-white font-semibold text-sm px-7 py-3 rounded-full shadow hover:scale-105 transition-all"
              style={{ color: "#d4198a" }}
            >
              2026 Edition <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 transition"
            >
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Testimonials;
