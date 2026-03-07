import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Images, ArrowLeft } from "lucide-react";
import { galleryAlbums } from "virtual:gallery-manifest";
import { formatAlbumTitle, formatAlbumDescription } from "./Gallery";

// ── Lightbox ───────────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  index: number;
  albumTitle: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ images, index, albumTitle, onClose, onPrev, onNext }: LightboxProps) => {
  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPrev, onNext, onClose]);

  // Touch / swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50)  onPrev();
    if (delta < -50) onNext();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-white/70 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      <button
        className="absolute left-3 md:left-6 p-3 text-white hover:text-white/70 transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image */}
      <img
        src={images[index]}
        alt={`${albumTitle} — photo ${index + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        className="absolute right-3 md:right-6 p-3 text-white hover:text-white/70 transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight size={36} />
      </button>

      {/* Counter */}
      <p className="absolute bottom-4 text-center text-sm text-white/70 px-4 select-none">
        {index + 1} / {images.length}
      </p>
    </div>
  );
};

// ── Grid section ──────────────────────────────────────────────────────────
const PAGE_SIZE = 24;

interface GridProps {
  images: string[];
  albumTitle: string;
  onOpen: (i: number) => void;
}

const ImageGrid = ({ images, albumTitle, onOpen }: GridProps) => {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = images.slice(0, visible);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {shown.map((src, i) => (
          <button
            key={src}
            onClick={() => onOpen(i)}
            className="aspect-square rounded-xl overflow-hidden group relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4198a]"
            aria-label={`Open photo ${i + 1} of ${albumTitle}`}
          >
            <img
              src={src}
              alt={`${albumTitle} — photo ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

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
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────
const GalleryAlbum = () => {
  const { album: slug } = useParams<{ album: string }>();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const albumData = galleryAlbums.find((a) => a.slug === slug);
  const images = albumData?.images ?? [];
  const title = slug ? formatAlbumTitle(slug) : "Album";
  const description = slug ? formatAlbumDescription(slug) : "";

  const openLightbox  = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx((i) => ((i ?? 0) - 1 + images.length) % images.length);
  const nextImage = () => setLightboxIdx((i) => ((i ?? 0) + 1) % images.length);

  if (!albumData) {
    return (
      <div className="min-h-screen gradient-dark flex flex-col items-center justify-center text-center px-4">
        <Images size={64} className="text-white/20 mb-6" />
        <h1 className="font-display text-3xl font-bold text-white mb-3">Album Not Found</h1>
        <p className="text-white/60 mb-8">This album does not exist yet.</p>
        <Link
          to="/gallery"
          className="px-6 py-3 rounded-full font-semibold text-sm text-white"
          style={{ backgroundColor: "#d4198a" }}
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-20 gradient-dark">
        <div className="container px-4 text-center">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
            Conference Archives
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-white leading-snug">
            {title}
          </h1>
          <div className="gold-divider" />
          <p className="text-white/75 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Back link + grid */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          {/* Back */}
          <div className="mb-8">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to all albums
            </Link>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-16 text-white/50">
              <Images size={48} className="mx-auto mb-4 opacity-30" />
              <p>No images in this album yet.</p>
            </div>
          ) : (
            <ImageGrid images={images} albumTitle={title} onOpen={openLightbox} />
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          albumTitle={title}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
};

export default GalleryAlbum;
