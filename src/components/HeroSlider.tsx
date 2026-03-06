/**
 * HeroSlider — fullscreen hero with fade-only image slideshow.
 *
 * - 3 images from /public/images/slideshow/{1,2,3}.jpg
 * - Crossfade transition (1 s CSS opacity) — no slide/translate animation
 * - Autoplay every 6 seconds
 * - Dark plum gradient overlay (#1a001f)
 * - Static centred content: title · subtitle · Register Now CTA
 * - Dot indicators (brand magenta #d4198a)
 * - Brand colours only: #d4198a / #ff33aa
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { trackEvent } from "@/lib/analytics";

const SLIDES = [
  "/images/slideshow/1.jpg",
  "/images/slideshow/2.jpg",
  "/images/slideshow/3.jpg",
];

const INTERVAL_MS = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    startTimer(); // reset timer on manual navigation
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Slide images — stacked, crossfade via opacity ──────────────────── */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          aria-hidden={i !== current}
          className="absolute inset-0 bg-cover bg-center will-change-[opacity]"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1000ms ease-in-out",
          }}
        />
      ))}

      {/* ── Dark plum gradient overlay ──────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,0,31,0.80) 0%, rgba(26,0,31,0.50) 45%, rgba(26,0,31,0.85) 100%)",
        }}
      />

      {/* ── Centred static content ──────────────────────────────────────────── */}
      <div className="relative z-10 container text-center px-4 pt-28 md:pt-36 pb-24">

        {/* Animated Logo — rounded background container */}
        <div className="mb-8 flex justify-center">
          <div
            className="hero-logo-anim"
            style={{ filter: "drop-shadow(0 0 40px rgba(255,51,170,0.45))" }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: 18,
                padding: "16px 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/images/logo.png"
                alt="E-WOMAN 2026"
                style={{ height: 140, width: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase text-white mb-4 drop-shadow-lg leading-tight"
        >
          E-Woman Conference 2026
        </h1>

        {/* Gold accent divider */}
        <div className="gold-divider mb-6 mx-auto" />

        {/* Subtitle */}
        <p
          className="font-display text-xl md:text-2xl italic text-white mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: "0 2px 8px rgba(26,0,31,0.6)" }}
        >
          Redefining Empowerment, One Woman at a Time.
        </p>

        {/* Countdown Timer */}
        <div className="mb-8">
          <p className="text-white text-xs uppercase tracking-widest mb-4 font-semibold">
            Event Starts In
          </p>
          <CountdownTimer targetDate="2026-03-13T00:00:00" />
        </div>

        {/* ── Floating Event Card ──────────────────────────────────────────── */}
        <div
          className="mx-auto w-full"
          style={{ maxWidth: 420 }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 32px 80px rgba(0,0,0,0.38), 0 8px 24px rgba(212,25,138,0.18)",
              padding: "36px 36px 32px",
            }}
          >
            {/* Card title */}
            <h2
              className="font-display text-xl font-bold mb-1 text-center"
              style={{ color: "#1a001f" }}
            >
              E-Woman Conference 2026
            </h2>

            {/* Gold rule */}
            <div className="gold-divider mb-5" />

            {/* Event details */}
            <ul className="space-y-3 mb-5 text-left">
              <li className="flex items-center gap-3">
                <Calendar size={16} style={{ color: "#d4198a", flexShrink: 0 }} />
                <span className="text-sm font-medium" style={{ color: "#4b5563" }}>
                  March 13–14, 2026
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} style={{ color: "#d4198a", flexShrink: 0 }} />
                <span className="text-sm font-medium" style={{ color: "#4b5563" }}>
                  Hilton Hotel – Yaoundé
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Users size={16} style={{ color: "#d4198a", flexShrink: 0 }} />
                <span className="text-sm font-semibold" style={{ color: "#d4198a" }}>
                  500+ Women Expected
                </span>
              </li>
            </ul>

            {/* Price line */}
            <p
              className="text-center text-sm font-semibold mb-5"
              style={{ color: "#6b7280" }}
            >
              Conference Pass —{" "}
              <span style={{ color: "#1a001f", fontWeight: 700 }}>50,000 FCFA</span>
            </p>

            {/* CTA button */}
            <Link
              to="/register"
              className="block w-full text-center py-4 rounded-full font-bold text-white text-base transition-all duration-200"
              style={{
                backgroundColor: "#d4198a",
                boxShadow: "0 6px 24px rgba(212,25,138,0.40)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#c0157c";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#d4198a";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
              onClick={() => trackEvent("hero_cta_click")}
            >
              Secure Your Seat
            </Link>
          </div>
        </div>
      </div>

      {/* ── Dot indicators ──────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10"
        role="tablist"
        aria-label="Slide navigation"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              width: i === current ? "28px" : "10px",
              height: "10px",
              backgroundColor: i === current ? "#d4198a" : "rgba(255,255,255,0.35)",
              border: i === current ? "none" : "1px solid rgba(255,255,255,0.25)",
              transition: "all 400ms ease",
              boxShadow: i === current ? "0 0 10px rgba(212,25,138,0.7)" : "none",
            }}
          />
        ))}
      </div>

    </section>
  );
}
