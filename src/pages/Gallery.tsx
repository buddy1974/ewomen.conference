import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { delawareImages, yaoundeImages } from "virtual:gallery-manifest";

// ── Contextual alt tags cycling through descriptive phrases ────────────────
const DELAWARE_ALTS = [
  "Women leadership session at E-Woman Conference Delaware",
  "E-Woman Conference Delaware — women rising in purpose",
  "Networking moment at E-Woman Conference Delaware",
  "Speaker delivering insight at E-Woman Conference Delaware",
  "E-Woman Conference Delaware — spiritual empowerment session",
  "Women connecting at E-Woman Conference Delaware",
  "E-Woman Conference Delaware — transformational gathering",
  "Women of faith at E-Woman Conference Delaware",
  "E-Woman Conference Delaware — community of women leaders",
  "Celebration and sisterhood at E-Woman Conference Delaware",
];

const YAOUNDE_ALTS = [
  "E-Woman Conference Yaoundé — women leadership session",
  "Speaker on stage at E-Woman Conference Yaoundé",
  "Women networking at E-Woman Conference Yaoundé",
  "E-Woman Conference Yaoundé — spiritual empowerment moment",
  "Women of purpose at E-Woman Conference Yaoundé",
  "E-Woman Conference Yaoundé — conference participants",
  "E-Woman Conference Yaoundé — sisterhood and connection",
  "Transformational session at E-Woman Conference Yaoundé",
  "E-Woman Conference Yaoundé — women rising in identity",
  "E-Woman Conference Yaoundé — leadership and faith gathering",
];

const getAlt = (alts: string[], index: number) => alts[index % alts.length];

// ── Lightbox ──────────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  alts: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ images, alts, index, onClose, onPrev, onNext }: LightboxProps) => (
  <div
    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
    onClick={onClose}
  >
    <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white">
      <X size={28} />
    </button>
    <button
      className="absolute left-3 md:left-6 p-2 text-white"
      onClick={(e) => { e.stopPropagation(); onPrev(); }}
    >
      <ChevronLeft size={36} />
    </button>
    <img
      src={images[index]}
      alt={alts[index]}
      className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    />
    <button
      className="absolute right-3 md:right-6 p-2 text-white"
      onClick={(e) => { e.stopPropagation(); onNext(); }}
    >
      <ChevronRight size={36} />
    </button>
    <p className="absolute bottom-4 text-center text-sm text-white/80 px-4">
      {alts[index]} &nbsp;·&nbsp; {index + 1} / {images.length}
    </p>
  </div>
);

// ── Gallery section ───────────────────────────────────────────────────────
const PAGE_SIZE = 24;

interface GallerySectionProps {
  images: string[];
  altList: string[];
  label: string;
}

const GallerySection = ({ images, altList, label }: GallerySectionProps) => {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const shown = images.slice(0, visible);
  const alts = images.map((_, i) => getAlt(altList, i));

  return (
    <div>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {shown.map((src, i) => (
          <button
            key={src}
            onClick={() => setLightboxIdx(i)}
            className="aspect-square rounded-xl overflow-hidden group relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4198a]"
            aria-label={`Open: ${alts[i]}`}
          >
            <img
              src={src}
              alt={alts[i]}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-xs font-medium leading-snug line-clamp-2">
                {alts[i]}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Load More */}
      {visible < images.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, images.length))}
            className="px-8 py-3 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#d4198a" }}
          >
            Load More — {images.length - visible} remaining
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          alts={alts}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => ((i ?? 0) - 1 + images.length) % images.length)}
          onNext={() => setLightboxIdx((i) => ((i ?? 0) + 1) % images.length)}
        />
      )}

      {images.length === 0 && (
        <div className="text-center py-16 text-white/50">
          <Images size={48} className="mx-auto mb-4 opacity-30" />
          <p>No images available for {label} yet.</p>
        </div>
      )}
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────
const Gallery = () => (
  <div>
    {/* Hero */}
    <section className="py-20 gradient-dark">
      <div className="container px-4 text-center">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
          Conference History
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-white">
          Gallery
        </h1>
        <div className="gold-divider" />
        <p className="text-white/85 max-w-2xl mx-auto mt-4">
          Real moments from real women. A visual record of the E-Woman movement in action.
        </p>
      </div>
    </section>

    {/* ── DELAWARE EDITION ─────────────────────────────────────────────── */}
    <section className="py-20 bg-background">
      <div className="container px-4">

        {/* Story */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
            United States
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            E-Woman Conference — Delaware Edition
          </h2>
          <div className="gold-divider mb-6" />
          <div className="space-y-4 text-white/85 text-base leading-relaxed text-left">
            <p>
              The Delaware gathering of the E-Woman movement brought together women leaders, entrepreneurs,
              and visionaries committed to personal transformation and kingdom impact.
            </p>
            <p>
              Throughout the conference, participants experienced powerful leadership sessions, meaningful
              networking moments, and spiritual empowerment that continues to shape the E-Woman community today.
            </p>
            <p>
              These moments captured below reflect the spirit of the conference — women rising, connecting,
              and stepping boldly into their purpose.
            </p>
          </div>
          <p className="mt-4 text-white/50 text-sm">
            {delawareImages.length} photographs
          </p>
        </div>

        <GallerySection
          images={delawareImages}
          altList={DELAWARE_ALTS}
          label="Delaware"
        />
      </div>
    </section>

    {/* ── YAOUNDÉ GATHERING ────────────────────────────────────────────── */}
    <section className="py-20" style={{ background: "hsl(329,70%,10%)" }}>
      <div className="container px-4">

        {/* Story */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
            Cameroon
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            E-Woman Conference — Yaoundé Gathering
          </h2>
          <div className="gold-divider mb-6" />
          <div className="space-y-4 text-white/85 text-base leading-relaxed text-left">
            <p>
              The Yaoundé edition of the E-Woman Conference welcomed women from across Cameroon and
              international destinations.
            </p>
            <p>
              For two days the conference hall became a space of empowerment, leadership growth, spiritual
              alignment, and meaningful sisterhood.
            </p>
            <p>
              These images capture powerful moments of transformation that define the E-Woman experience.
            </p>
          </div>
          <p className="mt-4 text-white/50 text-sm">
            {yaoundeImages.length} photographs
          </p>
        </div>

        <GallerySection
          images={yaoundeImages}
          altList={YAOUNDE_ALTS}
          label="Yaoundé"
        />
      </div>
    </section>
  </div>
);

export default Gallery;
