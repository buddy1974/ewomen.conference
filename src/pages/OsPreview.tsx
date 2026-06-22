/**
 * H8.1 — E-Woman Secure Preview Canvas
 *
 * Fetches a signed preview snapshot from the OS (/api/preview/ewoman?token=...)
 * and renders it using real E-Woman components where possible.
 *
 * Implements the full OS bridge protocol:
 *   PREVIEW_INIT  — receives edit-mode state, emits PREVIEW_READY
 *   EDIT_MODE     — toggles contentEditable on [data-editable] elements
 *   HIGHLIGHT_SECTION — scrolls to and outlines the target section
 *   SECTION_CLICK — outbound: user clicked a section
 *   FIELD_CHANGE  — outbound: user edited a [data-editable] field (debounced 600ms)
 *
 * Security: accepts postMessages only from the statically configured OS origin
 * (VITE_OS_URL). No Layout wrapper — routed outside Layout in App.tsx.
 *
 * Do NOT import HeroSlider (uses analytics/RegistrationCounter side-effects).
 * Do NOT use ContentContext (data comes from the OS preview API, not content.json).
 */

import { useEffect, useRef, useState } from "react";
import AuthorsSection from "@/components/AuthorsSection";
import VisionariesSection from "@/components/VisionariesSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import CountdownTimer from "@/components/CountdownTimer";

const OS_URL = import.meta.env.VITE_OS_URL || "http://localhost:3100/os";
const BRAND = "ewoman";

// ── E-Woman brand constants ───────────────────────────────────────────────────
const EW = {
  MAGENTA: "#d4198a",
  MAGENTA_DARK: "#9b0e61",
  PLUM: "#1a001f",
  GOLD: "#e0c55d",
  TEXT: "rgba(255,255,255,0.85)",
} as const;

// ── Types ─────────────────────────────────────────────────────────────────────

type Section = {
  id: string;
  page_id: string;
  type: string;
  parent_id: string | null;
  col: number | null;
  layout: string | null;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  button_label: string | null;
  button_url: string | null;
  order: number;
};

type PreviewData = {
  brand?: string;
  page: {
    id: string;
    versionId: string;
    title: string;
    status: string;
    createdAt: string;
  };
  sections: Section[];
};

type LoadState = "loading" | "ready" | "error";

// ── Section adapter ───────────────────────────────────────────────────────────
// Maps OS section types to E-Woman visual components.
// Real E-Woman components (AuthorsSection, VisionariesSection, TestimonialSlider,
// CountdownTimer) are used where their props / static data match the section type.
// Other types get E-Woman-styled generic blocks with data-editable fields.

function renderSection(s: Section): React.ReactNode {
  const sectionProps = {
    "data-section-id": s.id,
    "data-section-type": s.type,
  } as const;

  switch (s.type) {

    case "hero":
    case "banner":
      return (
        <section
          key={s.id}
          {...sectionProps}
          className="py-24 relative overflow-hidden text-center"
          style={{
            background: `linear-gradient(160deg, ${EW.PLUM} 0%, #220133 50%, ${EW.PLUM} 100%)`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,25,138,0.18) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />
          <div className="container px-4 relative z-10">
            {s.title && (
              <h1
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-4"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h1>
            )}
            {s.subtitle && (
              <p
                className="text-2xl sm:text-3xl font-semibold mb-6"
                style={{ color: "#ff77c2" }}
                data-editable="true"
                data-field="subtitle"
              >
                {s.subtitle}
              </p>
            )}
            {s.body && (
              <p
                className="max-w-2xl mx-auto text-lg leading-relaxed mb-8"
                style={{ color: EW.TEXT }}
                data-editable="true"
                data-field="body"
              >
                {s.body}
              </p>
            )}
            {s.button_label && (
              <span
                className="inline-flex items-center gap-2 font-semibold text-sm px-8 py-4 rounded-full shadow-lg"
                style={{ background: EW.MAGENTA, color: "#fff" }}
                data-editable="true"
                data-field="button_label"
              >
                {s.button_label}
              </span>
            )}
          </div>
        </section>
      );

    case "text":
    case "about":
    case "intro":
    case "convener":
    case "statement":
    case "movement":
      return (
        <section
          key={s.id}
          {...sectionProps}
          className="py-20"
          style={{
            background: `linear-gradient(135deg, ${EW.PLUM} 0%, #2d0a1f 100%)`,
          }}
        >
          <div className="container px-4 max-w-3xl mx-auto text-center">
            {s.subtitle && (
              <p
                className="text-xs uppercase tracking-[0.25em] font-semibold mb-3"
                style={{ color: EW.GOLD }}
                data-editable="true"
                data-field="subtitle"
              >
                {s.subtitle}
              </p>
            )}
            {s.title && (
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            <div className="gold-divider mb-6" />
            {s.body && (
              <p
                className="text-lg leading-relaxed"
                style={{ color: EW.TEXT }}
                data-editable="true"
                data-field="body"
              >
                {s.body}
              </p>
            )}
            {s.button_label && s.button_url && (
              <div className="mt-8">
                <span
                  className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-full"
                  style={{ background: EW.MAGENTA, color: "#fff" }}
                  data-editable="true"
                  data-field="button_label"
                >
                  {s.button_label}
                </span>
              </div>
            )}
          </div>
        </section>
      );

    case "cta":
    case "register":
    case "join":
    case "thankyou":
      return (
        <section
          key={s.id}
          {...sectionProps}
          className="py-24 text-center"
          style={{
            background: `linear-gradient(135deg, ${EW.MAGENTA} 0%, ${EW.MAGENTA_DARK} 100%)`,
          }}
        >
          <div className="container px-4 max-w-2xl mx-auto">
            {s.title && (
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            <div className="gold-divider mb-6" />
            {s.body && (
              <p
                className="text-white/90 text-lg leading-relaxed mb-8"
                data-editable="true"
                data-field="body"
              >
                {s.body}
              </p>
            )}
            {s.button_label && (
              <span
                className="inline-block bg-white font-bold px-10 py-4 rounded-full text-base shadow-lg"
                style={{ color: EW.MAGENTA }}
                data-editable="true"
                data-field="button_label"
              >
                {s.button_label}
              </span>
            )}
          </div>
        </section>
      );

    case "image":
    case "gallery_preview":
      return (
        <section
          key={s.id}
          {...sectionProps}
          className="py-12 bg-background"
        >
          <div className="container px-4">
            {s.title && (
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-6"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            {s.image_url && (
              <img
                src={s.image_url}
                alt={s.title ?? ""}
                className="w-full max-w-4xl mx-auto rounded-2xl block shadow-xl"
              />
            )}
            {s.subtitle && (
              <p
                className="text-center mt-4 text-white/60 text-sm"
                data-editable="true"
                data-field="subtitle"
              >
                {s.subtitle}
              </p>
            )}
          </div>
        </section>
      );

    case "testimonials":
    case "testimonial":
    case "voices": {
      // Parse body as JSON testimonial array; fall back to static sample
      let items: { name: string; quote: string }[] = [];
      if (s.body) {
        try {
          const parsed = JSON.parse(s.body);
          if (Array.isArray(parsed)) items = parsed;
        } catch { /* ignore */ }
      }
      if (!items.length) {
        items = [
          { name: "Conference Attendee", quote: "E-Woman helped me rediscover my purpose." },
          { name: "Participant", quote: "A life-changing experience for women of faith." },
          { name: "Community Leader", quote: "This gathering ignited something powerful in me." },
        ];
      }
      return (
        <section key={s.id} {...sectionProps} className="py-20 bg-background">
          <div className="container px-4">
            {s.title && (
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-12"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            <TestimonialSlider
              testimonials={items.map((t) => ({ name: t.name, quote: t.quote }))}
            />
          </div>
        </section>
      );
    }

    // Real E-Woman components — hardcoded data, wrapped with section-id for click-to-select
    case "authors":
    case "testimonies":
      return (
        <div key={s.id} {...sectionProps}>
          <AuthorsSection />
        </div>
      );

    case "visionaries":
    case "team":
    case "leadership":
      return (
        <div key={s.id} {...sectionProps}>
          <VisionariesSection />
        </div>
      );

    case "countdown":
    case "event_block":
    case "event":
    case "nextedition": {
      // body = ISO date string for CountdownTimer; subtitle = venue/description
      const targetDate = s.body ?? "2027-03-01";
      return (
        <section
          key={s.id}
          {...sectionProps}
          className="py-20 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${EW.PLUM} 0%, #220133 100%)`,
          }}
        >
          <div className="container px-4 relative z-10">
            {s.title && (
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-white mb-8"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            <CountdownTimer targetDate={targetDate} />
            {s.subtitle && (
              <p
                className="mt-6 text-white/70 text-sm font-medium"
                data-editable="true"
                data-field="subtitle"
              >
                {s.subtitle}
              </p>
            )}
          </div>
        </section>
      );
    }

    case "programs":
    case "cards":
    case "highlights":
    case "features":
    case "experience": {
      // Try to parse body as JSON array of { title, body } card objects
      let cards: { title: string; body: string }[] = [];
      if (s.body) {
        try {
          const parsed = JSON.parse(s.body);
          if (Array.isArray(parsed)) cards = parsed;
        } catch { /* ignore */ }
      }
      return (
        <section key={s.id} {...sectionProps} className="py-20 bg-background">
          <div className="container px-4">
            {s.title && (
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-center text-white mb-4"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            {s.subtitle && (
              <p
                className="text-center text-white/70 mb-12"
                data-editable="true"
                data-field="subtitle"
              >
                {s.subtitle}
              </p>
            )}
            {cards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 text-center space-y-3 shadow-sm bg-white"
                  >
                    <h3
                      className="font-display text-base font-bold leading-snug"
                      style={{ color: EW.PLUM }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(26,0,31,0.6)" }}>
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : s.body ? (
              <p
                className="text-center max-w-2xl mx-auto text-lg leading-relaxed"
                style={{ color: EW.TEXT }}
                data-editable="true"
                data-field="body"
              >
                {s.body}
              </p>
            ) : null}
          </div>
        </section>
      );
    }

    case "stats":
    case "impact": {
      let items: { number: string; label: string }[] = [];
      if (s.body) {
        try {
          const parsed = JSON.parse(s.body);
          if (Array.isArray(parsed)) items = parsed;
        } catch { /* ignore */ }
      }
      return (
        <section key={s.id} {...sectionProps} className="py-20 bg-background">
          <div className="container px-4">
            {s.title && (
              <h2
                className="font-display text-3xl font-bold text-center text-white mb-10"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            {items.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl py-6 px-3 text-center"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="font-display text-3xl font-bold mb-1"
                      style={{ color: EW.MAGENTA }}
                    >
                      {item.number}
                    </div>
                    <div className="text-xs font-medium text-white/60 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      );
    }

    // Generic fallback — E-Woman dark styling with editable fields
    default:
      return (
        <section
          key={s.id}
          {...sectionProps}
          className="py-16"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderBottom: `1px solid rgba(212,25,138,0.12)`,
          }}
        >
          <div className="container px-4 max-w-2xl mx-auto text-center">
            {s.subtitle && (
              <p
                className="text-xs uppercase tracking-[0.25em] font-semibold mb-3"
                style={{ color: EW.GOLD }}
                data-editable="true"
                data-field="subtitle"
              >
                {s.subtitle}
              </p>
            )}
            {s.title && (
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-white mb-4"
                data-editable="true"
                data-field="title"
              >
                {s.title}
              </h2>
            )}
            {s.body && (
              <p
                className="leading-relaxed"
                style={{ color: EW.TEXT }}
                data-editable="true"
                data-field="body"
              >
                {s.body}
              </p>
            )}
            {s.button_label && (
              <div className="mt-6">
                <span
                  className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-full"
                  style={{ background: EW.MAGENTA, color: "#fff" }}
                  data-editable="true"
                  data-field="button_label"
                >
                  {s.button_label}
                </span>
              </div>
            )}
          </div>
        </section>
      );
  }
}

// ── Row renderer ──────────────────────────────────────────────────────────────

function renderRow(row: Section, children: Section[]): React.ReactNode {
  const cols = children.length > 0 ? Math.min(children.length, 3) : 1;
  return (
    <div
      key={row.id}
      data-section-id={row.id}
      data-section-type="row"
      className="py-8"
      style={{ background: `${EW.PLUM}` }}
    >
      <div
        className="container px-4 mx-auto grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {children
          .slice()
          .sort((a, b) => (a.col ?? 0) - (b.col ?? 0))
          .map((child) => renderSection(child))}
      </div>
    </div>
  );
}

// ── Meta helper ───────────────────────────────────────────────────────────────

function ensureMeta(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function EwomanOsPreview() {
  const token = new URLSearchParams(window.location.search).get("token");
  const [state, setState] = useState<LoadState>("loading");
  const [data, setData] = useState<PreviewData | null>(null);

  // Bridge state
  const trustedOriginRef = useRef<string>(new URL(OS_URL).origin);
  const editModeRef = useRef(false);
  const inputTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // ── Security meta ─────────────────────────────────────────────────────────
  useEffect(() => {
    document.title = "Secure Preview | E-Woman Conference";
    ensureMeta("robots", "noindex,nofollow");
    ensureMeta("referrer", "no-referrer");
  }, []);

  // ── Fetch preview data ────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      setState("error");
      return;
    }
    let active = true;
    setState("loading");

    fetch(`${OS_URL}/api/preview/${BRAND}?token=${encodeURIComponent(token)}`, {
      cache: "no-store",
      credentials: "omit",
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<PreviewData>;
      })
      .then((preview) => {
        if (active) {
          setData(preview);
          setState("ready");
        }
      })
      .catch(() => {
        if (active) setState("error");
      });

    return () => {
      active = false;
    };
  }, [token]);

  // ── Bridge: inbound messages (OS → iframe) ────────────────────────────────
  useEffect(() => {
    const configuredOsOrigin = new URL(OS_URL).origin;

    function handleMessage(e: MessageEvent) {
      if (e.origin !== configuredOsOrigin && e.origin !== trustedOriginRef.current) return;
      if (!e.data || typeof e.data !== "object") return;
      const msg = e.data as { type: string; [k: string]: unknown };

      if (msg.type === "PREVIEW_INIT") {
        // Only accept PREVIEW_INIT from the statically configured OS origin
        if (e.origin !== configuredOsOrigin) return;
        trustedOriginRef.current = e.origin;
        const on = !!msg.editMode;
        editModeRef.current = on;
        document.body.classList.toggle("os-edit-mode", on);
        document.querySelectorAll("[data-editable]").forEach((el) => {
          (el as HTMLElement).contentEditable = on ? "true" : "false";
          (el as HTMLElement).spellcheck = false;
        });
        window.parent.postMessage({ type: "PREVIEW_READY" }, trustedOriginRef.current);
        return;
      }

      if (msg.type === "EDIT_MODE") {
        const on = !!msg.enabled;
        editModeRef.current = on;
        document.body.classList.toggle("os-edit-mode", on);
        document.querySelectorAll("[data-editable]").forEach((el) => {
          (el as HTMLElement).contentEditable = on ? "true" : "false";
          (el as HTMLElement).spellcheck = false;
        });
        return;
      }

      if (msg.type === "HIGHLIGHT_SECTION") {
        const sectionId = msg.sectionId as string | undefined;
        document.querySelectorAll(".os-section-selected").forEach((el) =>
          el.classList.remove("os-section-selected")
        );
        if (!sectionId) return;
        const target =
          document.querySelector<HTMLElement>(
            `[data-section-id="${CSS.escape(sectionId)}"]:not([data-field])`
          ) ??
          document.querySelector<HTMLElement>(
            `[data-section-id="${CSS.escape(sectionId)}"]`
          );
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", block: "nearest" });
        target.classList.add("os-section-selected");
        return;
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ── Bridge: click → SECTION_CLICK ────────────────────────────────────────
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // In edit mode: prevent navigation
      if (editModeRef.current) {
        const link = target.closest<HTMLAnchorElement>("a[href]");
        if (link && !link.dataset.field) event.preventDefault();
        const btn = target.closest<HTMLButtonElement>("button[type]");
        if (btn && !btn.dataset.field) event.preventDefault();
      }

      const sectionEl = target.closest<HTMLElement>("[data-section-id]");
      if (!sectionEl) return;

      const fieldEl = target.closest<HTMLElement>("[data-field]");
      const field = fieldEl?.dataset.field ?? "title";

      window.parent.postMessage(
        { type: "SECTION_CLICK", sectionId: sectionEl.dataset.sectionId, field },
        trustedOriginRef.current
      );

      // Highlight clicked section wrapper
      document.querySelectorAll(".os-section-selected").forEach((el) =>
        el.classList.remove("os-section-selected")
      );
      const wrapper = sectionEl.dataset.field
        ? sectionEl.closest<HTMLElement>("[data-section-id]:not([data-field])")
        : sectionEl;
      if (wrapper) wrapper.classList.add("os-section-selected");
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ── Bridge: input → FIELD_CHANGE (debounced 600 ms) ──────────────────────
  useEffect(() => {
    function handleInput(event: Event) {
      if (!editModeRef.current) return;
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const fieldEl = target.closest<HTMLElement>("[data-field]");
      if (!fieldEl) return;
      const sectionEl = fieldEl.closest<HTMLElement>("[data-section-id]");
      if (!sectionEl) return;

      const sectionId = sectionEl.dataset.sectionId;
      const field = fieldEl.dataset.field;
      if (!sectionId || !field) return;

      const key = `${sectionId}.${field}`;
      clearTimeout(inputTimersRef.current[key]);
      inputTimersRef.current[key] = setTimeout(() => {
        window.parent.postMessage(
          {
            type: "FIELD_CHANGE",
            sectionId,
            field,
            value: fieldEl.innerText.replace(/\n/g, " ").trim(),
          },
          trustedOriginRef.current
        );
        delete inputTimersRef.current[key];
      }, 600);
    }

    function handleKeydown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (event.key === "Enter" && target?.contentEditable === "true") {
        event.preventDefault();
      }
    }

    document.addEventListener("input", handleInput);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("input", handleInput);
      document.removeEventListener("keydown", handleKeydown);
      // Clear pending debounce timers on unmount
      Object.values(inputTimersRef.current).forEach(clearTimeout);
      inputTimersRef.current = {};
    };
  }, []);

  // ── Render states ─────────────────────────────────────────────────────────

  if (state === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: EW.PLUM }}
      >
        <p className="text-white/60 text-sm font-semibold">
          Loading secure preview…
        </p>
      </div>
    );
  }

  if (state === "error" || !data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-center px-6"
        style={{ background: EW.PLUM }}
      >
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-3">
            Preview unavailable
          </h1>
          <p className="text-white/60 text-sm">
            This preview link is invalid, expired, or no longer available.
          </p>
        </div>
      </div>
    );
  }

  // ── Build section tree ────────────────────────────────────────────────────

  const rows = [...data.sections].sort((a, b) => a.order - b.order);
  const childMap = new Map<string, Section[]>();
  for (const row of rows) {
    if (!row.parent_id) continue;
    const bucket = childMap.get(row.parent_id) ?? [];
    bucket.push(row);
    childMap.set(row.parent_id, bucket);
  }
  const topLevel = rows.filter((row) => !row.parent_id);

  return (
    <article
      data-page-version-id={data.page.versionId}
      style={{ background: EW.PLUM, minHeight: "100vh" }}
    >
      {/* Preview banner */}
      <div
        className="px-6 py-2 text-center text-xs font-semibold select-none"
        style={{
          background: "rgba(212,25,138,0.15)",
          color: "#ff77c2",
          borderBottom: "1px solid rgba(212,25,138,0.2)",
        }}
      >
        Secure preview · E-Woman Conference · version {data.page.versionId.slice(0, 8)}
      </div>

      {topLevel.length === 0 ? (
        <section
          className="min-h-[60vh] flex items-center justify-center text-center px-6"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-3">
              No sections yet
            </h1>
            <p className="text-white/60 text-sm">
              Add and save sections in the OS to create a preview.
            </p>
          </div>
        </section>
      ) : (
        topLevel.map((section) =>
          section.type === "row"
            ? renderRow(section, childMap.get(section.id) ?? [])
            : renderSection(section)
        )
      )}

      {/* Edit mode styles */}
      <style>{`
        .os-section-selected {
          outline: 2px solid ${EW.MAGENTA};
          outline-offset: -2px;
        }
        .os-edit-mode [data-editable="true"] {
          cursor: text;
          border-radius: 3px;
          transition: outline 0.15s;
        }
        .os-edit-mode [data-editable="true"]:hover {
          outline: 1px dashed rgba(212,25,138,0.65);
          outline-offset: 2px;
        }
        .os-edit-mode [data-editable="true"]:focus {
          outline: 2px solid ${EW.MAGENTA};
          outline-offset: 2px;
        }
      `}</style>
    </article>
  );
}
