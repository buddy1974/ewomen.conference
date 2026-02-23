import { Mail, Phone, MessageCircle } from "lucide-react";

const WA_NUMBER = "237683493220";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello, I am a media professional interested in E-WOMAN 2026")}`;

const Press = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="py-20 gradient-dark">
        <div className="container px-4 text-center">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            Press &amp; Media
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Press Kit
          </h1>
          <div className="gold-divider mb-5" />
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            Resources for media professionals covering E-WOMAN 2026 — The Excelling Woman.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 max-w-3xl">

          {/* Downloadable Documents */}
          <div className="mb-14">
            <h2 className="font-display text-2xl font-bold text-white mb-2">Downloadable Documents</h2>
            <div className="gold-divider mx-0 mb-6" style={{ margin: 0 }} />
            <div
              className="rounded-2xl p-8 text-center border border-[#e0c55d]/20"
              style={{ background: "linear-gradient(135deg, rgba(224,197,93,0.05), rgba(168,126,2,0.03))" }}
            >
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#e0c55d" }}>
                Coming Soon
              </p>
              <p className="text-foreground/60 leading-relaxed">
                Official press materials coming soon. Media kits, speaker bios, and brand assets will
                be available here before March 2026.
              </p>
            </div>
          </div>

          {/* Media Contact */}
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
              <p className="text-white/80 font-medium">E-WOMAN Media Team</p>
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
                    <p className="text-xs text-white/40 mb-0.5">WhatsApp</p>
                    <p className="font-semibold text-sm text-white">+237 6 83 49 32 20</p>
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
                    <p className="text-xs text-white/40 mb-0.5">Email</p>
                    <p className="font-semibold text-sm text-white">info@e-womanconference.online</p>
                  </div>
                </a>
                <a
                  href="tel:+237683493220"
                  className="flex items-center gap-3 text-white hover:text-[#ff33aa] transition group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #e0c55d, #a87e02)" }}
                  >
                    <Phone size={18} className="text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Phone</p>
                    <p className="font-semibold text-sm text-white">+237 6 83 49 32 20</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Press;
