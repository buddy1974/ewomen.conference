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
          className="font-display text-xl md:text-2xl italic text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: "0 2px 8px rgba(26,0,31,0.6)" }}
        >
          Redefining Empowerment, One Woman at a Time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold text-lg text-white shadow-lg"
            style={{
              backgroundColor: "#ff33aa",
              boxShadow: "0 4px 20px rgba(255,51,170,0.5)",
              transition: "background-color 250ms ease, transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d4198a";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ff33aa";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Register Now
          </Link>
          <a
            href={`https://wa.me/237683493220?text=${encodeURIComponent("Hello, I want to register for E-WOMAN 2026")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold text-lg text-white border-2 border-white/50 hover:border-white hover:bg-white/10 transition"
          >
            WhatsApp Us
          </a>
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
