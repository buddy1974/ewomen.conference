import { Link } from "react-router-dom";
import { Images } from "lucide-react";
import { galleryAlbums } from "virtual:gallery-manifest";

// ── Album metadata ─────────────────────────────────────────────────────────
// Maps folder slugs → display city name and country code for the title card.
// Add entries here as new editions are added.
const CITY_META: Record<string, { display: string; country: string }> = {
  delaware: { display: "Delaware", country: "USA" },
  yaounde:  { display: "Yaoundé",  country: "Cameroon" },
  lagos:    { display: "Lagos",    country: "Nigeria" },
  nairobi:  { display: "Nairobi",  country: "Kenya" },
};

/** Convert a folder slug into a human-readable album title.
 *
 * Rules:
 *  • `delaware`        → E-Woman Conference 2025 — Delaware, USA
 *  • `yaounde`         → E-Woman Conference 2025 — Yaoundé, Cameroon
 *  • `2026-yaounde`    → E-Woman Conference 2026 — Yaoundé, Cameroon
 *  • `2027-lagos`      → E-Woman Conference 2027 — Lagos, Nigeria
 */
export const formatAlbumTitle = (slug: string): string => {
  const yearMatch = slug.match(/^(\d{4})-(.+)$/);
  if (yearMatch) {
    const [, year, city] = yearMatch;
    const meta = CITY_META[city];
    const cityLabel = meta ? `${meta.display}, ${meta.country}` : capitalize(city);
    return `E-Woman Conference ${year} — ${cityLabel}`;
  }
  // Legacy slugs without year prefix → treat as 2025 edition
  const meta = CITY_META[slug];
  if (meta) return `E-Woman Conference 2025 — ${meta.display}, ${meta.country}`;
  return `E-Woman Conference 2025 — ${capitalize(slug)}`;
};

/** Short card description shown under the album title. */
export const formatAlbumDescription = (slug: string): string => {
  const yearMatch = slug.match(/^(\d{4})-(.+)$/);
  const city = yearMatch ? yearMatch[2] : slug;
  const meta = CITY_META[city];
  const cityLabel = meta ? meta.display : capitalize(city);
  return `Moments from the ${cityLabel} edition of the E-Woman Conference.`;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ── Album card ─────────────────────────────────────────────────────────────
interface AlbumCardProps {
  slug: string;
  leadImage: string | undefined;
  title: string;
  description: string;
}

const AlbumCard = ({ slug, leadImage, title, description }: AlbumCardProps) => (
  <div className="rounded-2xl overflow-hidden shadow-xl flex flex-col" style={{ background: "rgba(255,255,255,0.06)" }}>
    {/* Lead image */}
    <div className="aspect-[4/3] overflow-hidden bg-black/30">
      {leadImage ? (
        <img
          src={leadImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Images size={48} className="text-white/20" />
        </div>
      )}
    </div>

    {/* Info */}
    <div className="p-6 flex flex-col flex-1">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
        {title}
      </h2>
      <p className="text-white/75 text-sm leading-relaxed flex-1 mb-6">
        {description}
      </p>
      <Link
        to={`/gallery/${slug}`}
        className="inline-block self-start px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        style={{ backgroundColor: "#d4198a" }}
      >
        View Gallery
      </Link>
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────
const Gallery = () => (
  <div>
    {/* Hero */}
    <section className="py-20 gradient-dark">
      <div className="container px-4 text-center">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "#e0c55d" }}>
          Archives
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-white">
          Conference History Gallery
        </h1>
        <div className="gold-divider" />
        <p className="text-white/80 max-w-2xl mx-auto mt-4 text-base leading-relaxed">
          Moments from previous E-Woman Conferences across different cities and nations.
        </p>
      </div>
    </section>

    {/* Description */}
    <section className="py-10 gradient-dark border-t border-white/10">
      <div className="container px-4 max-w-3xl mx-auto text-center">
        <p className="text-white/75 text-base leading-relaxed">
          These images are from the 2025 edition of the E-Woman Conference.
          Each year the movement gathers women for leadership, empowerment, and spiritual alignment.
          This gallery preserves moments from previous editions as we prepare for the upcoming conference.
        </p>
      </div>
    </section>

    {/* Album grid */}
    <section className="py-20 bg-background">
      <div className="container px-4">
        {galleryAlbums.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            <Images size={48} className="mx-auto mb-4 opacity-30" />
            <p>No albums available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {galleryAlbums.map((album) => (
              <AlbumCard
                key={album.slug}
                slug={album.slug}
                leadImage={album.images[0]}
                title={formatAlbumTitle(album.slug)}
                description={formatAlbumDescription(album.slug)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  </div>
);

export default Gallery;
