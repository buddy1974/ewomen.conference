import { Mail, MessageCircle, MapPin, Globe } from "lucide-react";
import { useSEO } from "@/lib/useSEO";

const WA_URL = `https://wa.me/237683493220?text=${encodeURIComponent("Hello, I have a question about E-Woman Conference")}`;

const Contact = () => {
  useSEO({
    title: "Contact E-Woman Conference | Yaoundé, Cameroon",
    description:
      "Get in touch with the E-Woman Conference team. For general enquiries, media requests, sponsorship, or partnership opportunities — contact us via email, WhatsApp, or our online form.",
    canonical: "/contact",
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
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,25,138,0.16) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 container px-4 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#e0c55d" }}>
            Get In Touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Contact Us
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-white/85 text-lg leading-relaxed">
            We would love to hear from you. Reach out for general enquiries, media requests,
            sponsorship, or partnership opportunities.
          </p>
        </div>
      </section>

      <div className="container px-4 max-w-4xl mx-auto py-20 space-y-16">

        {/* Contact Cards */}
        <section className="grid sm:grid-cols-2 gap-6">

          {/* WhatsApp */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl overflow-hidden block transition hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #1f0414, #2d0a1f)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="px-6 py-4" style={{ background: "linear-gradient(90deg, #25D366, #1ebe5d)" }}>
              <h2 className="font-display text-lg font-bold text-white">WhatsApp</h2>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(37,211,102,0.15)" }}
                >
                  <MessageCircle size={20} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-0.5">Send a message</p>
                  <p className="font-semibold text-white text-sm">+237 6 83 49 32 20</p>
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed">
                The fastest way to reach us. Send a WhatsApp message and our team will respond promptly.
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@e-womanconference.online"
            className="group rounded-2xl overflow-hidden block transition hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #1f0414, #2d0a1f)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="px-6 py-4" style={{ background: "linear-gradient(90deg, #d4198a, #c0157c)" }}>
              <h2 className="font-display text-lg font-bold text-white">Email</h2>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(212,25,138,0.15)" }}
                >
                  <Mail size={20} style={{ color: "#d4198a" }} />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-0.5">Send an email</p>
                  <p className="font-semibold text-white text-sm">info@e-womanconference.online</p>
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed">
                For formal enquiries, media accreditation, sponsorship proposals, or partnership requests.
              </p>
            </div>
          </a>

        </section>

        {/* Location + Website */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-6 space-y-3 border border-white/10"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(224,197,93,0.12)" }}
              >
                <MapPin size={20} style={{ color: "#e0c55d" }} />
              </div>
              <h3 className="font-semibold text-white">Location</h3>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">
              E-Woman Conference<br />
              Hilton Hotel, Yaoundé<br />
              Cameroon, Central Africa
            </p>
          </div>
          <div
            className="rounded-2xl p-6 space-y-3 border border-white/10"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,25,138,0.12)" }}
              >
                <Globe size={20} style={{ color: "#d4198a" }} />
              </div>
              <h3 className="font-semibold text-white">Website</h3>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">
              www.e-womanconference.online
            </p>
            <p className="text-white/55 text-xs leading-relaxed">
              Official website for conference news, gallery, media coverage, and registration.
            </p>
          </div>
        </section>

        {/* Enquiry Types */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6 text-white">What Can We Help With?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "General Enquiries", body: "Questions about E-Woman Conference, upcoming editions, or the organization." },
              { title: "Media & Press", body: "Press accreditation, interview requests, broadcast partnerships, and media coverage." },
              { title: "Sponsorship", body: "Sponsor the next edition of E-Woman Conference and reach hundreds of women leaders." },
              { title: "Speakers", body: "Speaker nominations, speaker applications, and speaker partnership requests." },
              { title: "Partnerships", body: "Organizational partnerships, NGO collaboration, corporate social responsibility." },
              { title: "Volunteer", body: "Join the E-Woman team as a volunteer for the next conference edition." },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5 space-y-2 border border-white/10"
                style={{ background: "rgba(212,25,138,0.04)" }}
              >
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-white/65 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
