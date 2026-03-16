import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mic, BookOpen, Users, Sparkles, Quote, ClipboardList, CheckCircle, Heart, Trophy, CalendarCheck } from "lucide-react";

const BADGE_KEYWORDS = ["Author", "Pastor", "Apostle", "Coach", "Mentor", "Entrepreneur", "Speaker", "Minister", "Leader", "Prophet"];
const getSpeakerBadge = (title: string): string => {
  for (const kw of BADGE_KEYWORDS) {
    if (title.toLowerCase().includes(kw.toLowerCase())) return kw;
  }
  return title.split(/[,&|•/]/)[0].trim().substring(0, 18);
};
import { useContent } from "@/contexts/ContentContext";

import TestimonialSlider from "@/components/TestimonialSlider";
import HeroSlider from "@/components/HeroSlider";
import AuthorsSection from "@/components/AuthorsSection";
import VisionariesSection from "@/components/VisionariesSection";

// ── Conference 2026 Highlights ────────────────────────────────────────────────
const HIGHLIGHTS = [
  { icon: <Mic size={22} />, text: "Inspiring speakers" },
  { icon: <Quote size={22} />, text: "Powerful testimonies" },
  { icon: <Users size={22} />, text: "Networking sessions" },
  { icon: <BookOpen size={22} />, text: "Leadership workshops" },
  { icon: <Trophy size={22} />, text: "Awards & recognition" },
  { icon: <Heart size={22} />, text: "Worship & ministry" },
];

// ── Static testimonials ───────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "E-Woman helped me rediscover my purpose.", name: "Conference Attendee" },
  { quote: "This gathering ignited something powerful in me.", name: "Participant" },
  { quote: "A life-changing experience for women of faith.", name: "Community Leader" },
];

const Index = () => {
  const { content } = useContent();
  const c = content!;

  // Scroll-triggered sticky Register button
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>

      {/* ── POST-EVENT BANNER ───────────────────────────────────────────────── */}
      <div
        className="text-center text-sm font-medium text-white"
        style={{ background: "#1a001f", padding: "8px 16px" }}
      >
        E-Woman Conference 2026 has successfully concluded — Thank you to all who attended!
      </div>

      {/* HERO — fullscreen fade slider */}
      <HeroSlider />

      {/* ── POST-EVENT NOTICE BANNER ─────────────────────────────────────────── */}
      <div
        className="text-center text-sm font-semibold px-4 py-3"
        style={{ background: "#e0c55d", color: "#1a001f" }}
      >
        Thank you to all participants, speakers, partners & volunteers. Stay connected for the next edition.
      </div>

      {/* TRUST STRIP */}
      <section className="py-10 bg-background border-y border-white/10 reveal">
        <div className="container px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-white font-semibold mb-6">
            A Growing Movement
          </p>
          <div className="flex flex-wrap justify-center gap-10 text-white text-sm font-medium">
            <span>500+ Women Impacted</span>
            <span>2 Continents</span>
            <span>Yaoundé • Delaware</span>
            <span>Life-Changing Testimonies</span>
          </div>
        </div>
      </section>

      {/* ── PART 1: GLOBAL MOVEMENT ─────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #d4198a 0%, #9b0e61 100%)" }}>
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 reveal">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "#e0c55d" }}>
              More Than a Conference
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              A Movement of Women Rising
            </h2>
            <div className="gold-divider" />
            <p className="text-white/90 text-lg leading-relaxed">
              E-Woman Conference is more than an event.
            </p>
            <p className="text-white/85 text-base leading-relaxed">
              It is a growing movement of women who are rising in identity, leadership, and influence across nations.
              Each year, women gather not only to learn, but to transform — to return to their communities stronger,
              clearer, and equipped to lead.
            </p>
            <p className="text-white/85 text-base leading-relaxed">
              From entrepreneurs to ministry leaders, from young professionals to seasoned executives, E-Woman continues
              to shape women who are ready to build legacy.
            </p>
          </div>
        </div>
      </section>

      {/* ── PART 2: CONFERENCE EXPERIENCE ────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
              The Experience
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              What Happens at E-Woman
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: <Mic size={28} />,
                title: "Leadership Sessions",
                body: "Insightful talks from experienced women leaders.",
              },
              {
                icon: <BookOpen size={28} />,
                title: "Transformational Conversations",
                body: "Real discussions about purpose, faith, leadership, and life.",
              },
              {
                icon: <Users size={28} />,
                title: "Powerful Networking",
                body: "Meaningful connections with women from different cities and nations.",
              },
              {
                icon: <Sparkles size={28} />,
                title: "Spiritual Empowerment",
                body: "Moments of prayer, reflection, and spiritual alignment.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="reveal rounded-2xl p-6 text-center space-y-4 shadow-sm"
                style={{ animationDelay: `${i * 0.1}s`, background: "#ffffff" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ background: "linear-gradient(135deg, #d4198a, #ff33aa)", color: "#fff" }}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-base font-bold leading-snug" style={{ color: "#1a001f" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,0,31,0.6)" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS HIGHLIGHTS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
              E-Woman Conference 2026
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              A Powerful Gathering of Women
            </h2>
            <div className="gold-divider" />
            <p className="text-white/80 text-base leading-relaxed mt-5 max-w-2xl mx-auto">
              Hundreds of women gathered for inspiration, leadership, networking, and empowerment
              at the E-Woman Conference 2026 — March 13–14 at the Hilton Hotel, Yaoundé.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="reveal flex items-center gap-4 rounded-2xl p-5 shadow-sm"
                style={{ animationDelay: `${i * 0.08}s`, background: "#ffffff" }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #d4198a, #ff33aa)", color: "#fff" }}
                >
                  {item.icon}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={15} style={{ color: "#d4198a", flexShrink: 0 }} />
                  <p className="font-semibold" style={{ color: "#1a001f" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONVENER */}
      <section className="py-28 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal relative flex justify-center md:justify-start">
              <div className="relative before:absolute before:-inset-6 before:rounded-3xl before:bg-accent/10 before:blur-3xl before:-z-10">
                <div className="w-[300px] sm:w-[340px] md:w-[380px] aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <img
                    src={c.convener.image}
                    alt={c.convener.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-2 text-center md:text-left space-y-6 max-w-xl mx-auto md:mx-0">
              <p className="text-sm uppercase tracking-widest text-white font-semibold">
                Convener
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-white">
                {c.convener.name}
              </h2>
              <p className="text-white text-sm sm:text-base font-medium">
                {c.convener.title}
              </p>
              <p className="text-white leading-relaxed text-lg">
                {c.convener.bio}
              </p>
              <p className="text-white italic text-base font-semibold">
                "{c.convener.mission}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold text-center mb-4">
            {c.about.title}
          </h2>
          <p className="reveal reveal-delay-1 text-center text-white font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            {c.about.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.about.highlights.map((h: any, i: number) => (
              <div
                key={h.label}
                className="reveal p-6 text-center rounded-2xl shadow-sm"
                style={{ animationDelay: `${i * 0.1}s`, background: "rgba(255,255,255,0.95)" }}
              >
                <div className="font-display text-3xl sm:text-4xl font-bold mb-2 stat-number" style={{ color: "#d4198a" }}>
                  {h.number}
                </div>
                <div className="text-sm font-semibold" style={{ color: "#1a001f" }}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PART 3: INTERNATIONAL PARTICIPATION ─────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a001f 0%, hsl(329,70%,10%) 100%)" }}
      >
        {/* Decorative radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,25,138,0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 reveal">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "#e0c55d" }}>
              Beyond Borders
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Women From Across Nations
            </h2>
            <div className="gold-divider" />
            <p className="text-white/90 text-base leading-relaxed">
              E-Woman Conference brings together women from Cameroon and international destinations.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              Each year the gathering grows — creating a powerful environment where diverse experiences, cultures,
              and leadership journeys meet.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              The result is a community of women who are connected beyond borders and committed to lifting
              one another higher.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {["Cameroon", "United States", "United Kingdom", "France", "Africa"].map((loc) => (
                <span
                  key={loc}
                  className="text-xs font-semibold px-4 py-2 rounded-full border"
                  style={{ color: "#e0c55d", borderColor: "rgba(224,197,93,0.35)" }}
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SPEAKERS */}
      <section className="py-20 gradient-dark">
        <div className="container px-4">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            Featured Speakers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.speakers.slice(0, 3).map((speaker: any, index: number) => (
              <Link
                key={speaker.slug}
                to={`/speakers/${speaker.slug}`}
                className="reveal overflow-hidden group transition-all block rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 speaker-card"
                style={{ animationDelay: `${index * 0.1}s`, background: "#ffffff" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-1" style={{ color: "#1a001f" }}>{speaker.name}</h3>
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2"
                    style={{ background: "rgba(212,25,138,0.10)", color: "#d4198a" }}
                  >
                    {getSpeakerBadge(speaker.title)}
                  </span>
                  <p className="text-sm mb-2" style={{ color: "rgba(26,0,31,0.6)" }}>{speaker.title}</p>
                  <p className="text-sm font-medium" style={{ color: "#d4198a" }}>{speaker.topic}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="reveal reveal-delay-3 text-center mt-10">
            <Link
              to="/speakers"
              className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full hover:bg-white/20 transition font-medium"
            >
              View All Speakers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VOICES FROM WOMEN IMPACTED ────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            Voices from Women Impacted
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="reveal rounded-2xl p-8 shadow-sm"
                style={{ animationDelay: `${i * 0.1}s`, background: "#ffffff" }}
              >
                <Quote size={28} style={{ color: "#d4198a", marginBottom: 16 }} />
                <p
                  className="font-display text-lg italic leading-relaxed mb-6"
                  style={{ color: "#1a001f" }}
                >
                  "{t.quote}"
                </p>
                <p className="text-sm font-semibold" style={{ color: "#d4198a" }}>
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXISTING TESTIMONIAL SLIDER */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            What Attendees Say
          </h2>
          <div className="reveal reveal-delay-1">
            <TestimonialSlider testimonials={c.testimonials} />
          </div>
        </div>
      </section>

      {/* AUTHORS */}
      <AuthorsSection />

      {/* VISIONARIES */}
      <VisionariesSection />

      {/* ── PART 5: HIGHLIGHTS FROM PREVIOUS CONFERENCES ─────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
              Conference Moments
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Moments From E-Woman Conferences
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                src: "/images/gallery/delaware/delaware-1.jpg",
                alt: "Women leaders connecting during a powerful networking session at E-Woman Conference Delaware",
                caption: "Women leaders connecting during a powerful networking session.",
              },
              {
                src: "/images/gallery/delaware/delaware-3.jpg",
                alt: "Speaker delivering transformational leadership insight at E-Woman Conference",
                caption: "Speaker delivering transformational leadership insight.",
              },
              {
                src: "/images/gallery/yaounde/img-1.jpg",
                alt: "Moments of celebration and sisterhood at E-Woman Conference Yaoundé",
                caption: "Moments of celebration and sisterhood during the conference experience.",
              },
              {
                src: "/images/gallery/delaware/delaware-5.jpg",
                alt: "Women rising in purpose at E-Woman Conference Delaware",
                caption: "Women rising in identity, leadership, and influence.",
              },
              {
                src: "/images/gallery/yaounde/img-10.jpg",
                alt: "E-Woman Conference Yaoundé — spiritual empowerment session",
                caption: "Spiritual empowerment and alignment at the Yaoundé gathering.",
              },
            ].map((img, i) => (
              <div
                key={i}
                className="reveal group overflow-hidden rounded-2xl relative"
                style={{ animationDelay: `${i * 0.1}s`, boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end">
                  <p className="px-4 pb-4 text-white text-sm font-medium leading-snug">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-white/20 text-white hover:bg-white/10 transition"
            >
              View Full Gallery <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── THANK YOU SECTION ────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #d4198a 0%, #9b0e61 100%)" }}
      >
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 reveal">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "#fce9f5" }}>
              With Gratitude
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Thank You For Being Part of E-Woman
            </h2>
            <div className="gold-divider" />
            <p className="text-white/90 text-lg leading-relaxed">
              We thank all attendees, speakers, partners, sponsors, and volunteers
              who made this conference a success.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              Your presence, energy, and commitment made E-Woman Conference 2026 truly unforgettable.
              Together we created something powerful — a room full of women rising in identity, leadership, and purpose.
            </p>
            <div className="pt-2">
              <Link
                to="/evaluation"
                className="reveal inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all duration-200 hover:scale-105"
                style={{ color: "#d4198a" }}
              >
                <ClipboardList size={18} />
                Fill Evaluation Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT EDITION TEASER ──────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a001f 0%, hsl(329,70%,10%) 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,25,138,0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="container px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6 reveal">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(212,25,138,0.15)", color: "#ff33aa", border: "1px solid rgba(212,25,138,0.3)" }}
            >
              <CalendarCheck size={14} />
              Coming Soon
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Next Edition Coming Soon
            </h2>
            <div className="gold-divider" />
            <p className="text-white/80 text-base leading-relaxed">
              Preparation for the next E-Woman Conference has already started.
              Stay connected for announcements about dates, speakers, and registration.
            </p>
            <p className="font-display text-lg font-semibold italic" style={{ color: "#e0c55d" }}>
              Empower · Elevate · Excel
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href="https://wa.me/237683493220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold text-sm shadow hover:bg-[#1ebe5d] transition"
              >
                Stay Connected via WhatsApp
              </a>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition"
              >
                View Gallery <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — Parts 4 & 5 ────────────────────────────────────────────────── */}
      <section className="py-24 gradient-dark">
        <div className="container px-4 text-center max-w-2xl mx-auto">
          <p className="reveal text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: "#e0c55d" }}>
            Conference Concluded
          </p>
          <h2 className="reveal font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            E-Woman Conference 2026
          </h2>
          <div className="gold-divider mb-6" />
          <p className="reveal reveal-delay-1 text-white/90 text-base leading-relaxed mb-3">
            Thank you to all the guests who attended the conference.
            We appreciate your participation and support.
          </p>
          <p className="reveal reveal-delay-1 text-white font-semibold mb-1">
            March 13 – 14, 2026
          </p>
          <p className="reveal reveal-delay-1 text-white/80 mb-8">
            Hilton Hotel — Yaoundé, Cameroon
          </p>

          {/* Evaluation CTA — primary */}
          <Link
            to="/evaluation"
            className="reveal reveal-delay-3 inline-flex items-center justify-center gap-2 bg-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 hover:scale-105"
            style={{ color: "#d4198a" }}
          >
            <ClipboardList size={20} />
            Conference Evaluation
          </Link>

          {/* Secondary CTAs */}
          <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-3 mt-4">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/10 hover:border-white"
            >
              View Gallery <ArrowRight size={16} />
            </Link>
            <Link
              to="/media"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-white/10 hover:border-white"
            >
              Media <ArrowRight size={16} />
            </Link>
          </div>

          <p className="reveal reveal-delay-3 mt-8 text-white/70 text-sm leading-relaxed">
            Stay connected for announcements about the next edition.
          </p>
        </div>
      </section>

      {/* MOBILE STICKY EVALUATION */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 p-4 z-50">
        <Link
          to="/evaluation"
          className="flex items-center justify-center gap-2 w-full text-center bg-white py-3 rounded-full font-semibold text-base shadow-lg"
          style={{ color: "#d4198a" }}
        >
          <ClipboardList size={17} />
          Fill Evaluation Form
        </Link>
      </div>

      {/* ── SCROLL-TRIGGERED STICKY EVALUATION (desktop) ─────────────────────── */}
      {showSticky && (
        <Link
          to="/evaluation"
          className="hidden md:flex fixed items-center gap-2 text-white font-semibold text-sm z-50 transition-all duration-300"
          style={{
            bottom: 20,
            right: 20,
            backgroundColor: "#d4198a",
            padding: "14px 20px",
            borderRadius: 999,
            boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
          }}
        >
          <ClipboardList size={16} />
          Fill Evaluation
        </Link>
      )}

    </div>
  );
};

export default Index;
