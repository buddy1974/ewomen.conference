import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

// Kept as empty export so existing AuthorDetail route still compiles
export const books: never[] = [];

const testimonials = [
  {
    id: 2,
    name: "Christelle N.",
    image: "/images/writers/book-2.jpg",
    text: "The E-Woman conference was a turning point for me. I left with strength, vision, and the courage to move forward in what God placed in my heart.",
  },
  {
    id: 3,
    name: "Vanessa T.",
    image: "/images/writers/book-3.jpg",
    text: "Through the E-Woman movement, I discovered my voice, my calling, and the power of sisterhood.",
  },
  {
    id: 4,
    name: "Sandra M.",
    image: "/images/writers/book4.jpg",
    text: "I walked in carrying the weight of years of silence. I walked out knowing my story had purpose. E-Woman gave me permission to live fully.",
  },
  {
    id: 5,
    name: "Princesse L.",
    image: "/images/writers/book5.jpg",
    text: "E-Woman is not just a conference — it is a movement. I found women who looked like me, believed like me, and were becoming who I was already called to be.",
  },
  {
    id: 6,
    name: "Grace A.",
    image: "/images/writers/book6.jpg",
    text: "Every workshop, every word, every moment was intentional. I left E-Woman with a vision board in my heart and a fire in my spirit that has not gone out.",
  },
];

const AuthorsSection = () => {
  return (
    <section id="testimonies" className="py-24 gradient-dark">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            Real Impact. Real Stories.
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            E-Woman Testimonies
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-white/90 max-w-2xl mx-auto text-sm uppercase tracking-widest font-semibold mb-10">
            Women whose lives were transformed through the E-Woman experience
          </p>

          {/* Narrative introduction */}
          <div className="max-w-3xl mx-auto text-left space-y-5 bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white text-center">
              E-Woman is not just a conference.
            </h3>
            <div className="w-16 h-0.5 mx-auto" style={{ background: "#e0c55d" }} />
            <p className="text-white/90 text-base leading-relaxed font-semibold text-center italic">
              It is a transformational experience that continues long after the event ends.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              These women are testimonies of what happens when purpose, leadership, and faith
              come together in the right environment.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              Their journeys reflect the impact of the E-Woman movement.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="reveal"
              style={{
                animationDelay: `${i * 0.08}s`,
                background: "#ffffff",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
              }}
            >
              {/* Photo */}
              <div
                className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2"
                style={{ borderColor: "#d4198a" }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3
                className="font-display text-base font-bold text-center mb-1"
                style={{ color: "#1a001f" }}
              >
                {t.name}
              </h3>

              {/* Badge */}
              <p
                className="text-xs text-center mb-4 font-semibold uppercase tracking-wider"
                style={{ color: "#d4198a" }}
              >
                E-Woman
              </p>

              {/* Testimony */}
              <div className="flex gap-2 items-start">
                <Quote size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#e0c55d" }} />
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,0,31,0.70)" }}>
                  {t.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="reveal mt-16 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-0.5 mx-auto" style={{ background: "#e0c55d" }} />
          <p className="text-white/90 text-base leading-relaxed">
            These women represent the living impact of the E-Woman movement.
          </p>
          <p className="text-white font-semibold text-base">
            Join us at the E-Woman Conference and write your own story.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
            style={{ backgroundColor: "#d4198a", boxShadow: "0 8px 28px rgba(212,25,138,0.40)" }}
          >
            Register for the Conference
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AuthorsSection;
