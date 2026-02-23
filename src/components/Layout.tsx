import { useState, SyntheticEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Speakers", href: "/speakers" },
  { label: "Schedule", href: "/schedule" },
  { label: "Gallery", href: "/gallery" },
  { label: "Press", href: "/press" },
  { label: "Register", href: "/register" },
];

// Canonical WhatsApp number for all E-Woman contact
const WA_NUMBER = "237683493220";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello, I want to register for E-WOMAN 2026")}`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useContent();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sticky Nav ───────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/15 shadow-lg"
        style={{ minHeight: 88, background: "linear-gradient(90deg, #d4198a 0%, #c0157c 100%)" }}
      >
        <div className="container flex items-center justify-between px-4" style={{ minHeight: 88 }}>

          {/* Logo — white backing container per spec */}
          <Link to="/" className="flex items-center shrink-0 py-2">
            <div style={{ background: "#ffffff", borderRadius: 12, padding: "12px 18px", boxShadow: "0 4px 16px rgba(0,0,0,0.18)", display: "flex", alignItems: "center" }}>
              <img
                src="/images/logo.png"
                alt="E-WOMAN 2026 Logo"
                style={{ height: 80, width: "auto", objectFit: "contain", display: "block" }}
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span className="hidden font-display text-xl font-bold tracking-wider text-[#d4198a]">
                E-WOMAN 2026
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-semibold tracking-wide transition-all ${
                  location.pathname === link.href
                    ? "text-white underline underline-offset-4"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/register"
              className="ml-2 px-5 py-2 rounded-full text-sm font-bold text-[#d4198a] bg-white shadow hover:bg-white/90 transition"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/15 transition text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/15" style={{ background: "#b01476" }}>
            <div className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                    location.pathname === link.href
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="mt-2 py-3 px-3 rounded-full text-center text-sm font-bold text-[#d4198a] bg-white shadow"
              >
                Register Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main style={{ paddingTop: 88 }}>{children}</main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="gradient-dark py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brand Column */}
            <div className="space-y-5">
              <img
                src="/images/logo.png"
                alt="E-WOMAN 2026 Logo"
                style={{ height: 120, width: "auto", objectFit: "contain" }}
                className="brightness-0 invert"
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span className="hidden font-display text-2xl font-bold text-foreground">
                E-WOMAN 2026
              </span>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Empowering women to rise boldly in purpose, leadership and faith.
                A gathering where vision meets action.
              </p>
              <p className="text-sm font-semibold" style={{ color: "#e0c55d" }}>
                Empower • Elevate • Excel
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="font-display text-xs uppercase tracking-widest text-foreground/40 mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Speakers", href: "/speakers" },
                  { label: "Schedule", href: "/schedule" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Register", href: "/register" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-foreground/60 hover:text-foreground transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-display text-xs uppercase tracking-widest text-foreground/40 mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                <li>
                  <p>Hilton Hotel</p>
                  <p>Yaoundé, Cameroon</p>
                </li>
                <li>
                  WhatsApp:{" "}
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                    +237 6 83 49 32 20
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a href="mailto:info@e-womanconference.online" className="hover:text-foreground transition">
                    info@e-womanconference.online
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-foreground/30 text-xs">
            © {new Date().getFullYear()} E-WOMAN Conference. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ──────────────────────────────────────── */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform animate-whatsapp-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} fill="white" />
        <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
      </a>

    </div>
  );
};

export default Layout;
