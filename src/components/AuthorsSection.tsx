import { Link } from "react-router-dom";

export const books = [
  {
    slug: "the-resilience-code",
    title: "The Resilience Code",
    author: "Pst. Delphine Nforgwei",
    image: "/images/writers/book-1.jpg",
    description:
      "A transformational guide for women navigating the fires of adversity. The Resilience Code reveals the divine blueprint hidden in every hardship — equipping women to rise not just despite their trials, but because of them. A must-read for every woman who has ever questioned her strength.",
  },
  {
    slug: "conflict-management-and-resolution-in-marriage",
    title: "Conflict Management and Resolution in Marriage",
    author: "Pst. Delphine Nforgwei",
    image: "/images/writers/book-2.jpg",
    description:
      "With biblical wisdom and practical insight, this book equips couples to transform conflict into covenant. Discover how to communicate with grace, resolve differences with dignity, and build a marriage that reflects the glory of God.",
  },
  {
    slug: "a-girl-without-tears",
    title: "A Girl Without Tears",
    author: "Pst. Delphine Nforgwei",
    image: "/images/writers/book-3.jpg",
    description:
      "An intimate and courageous journey through pain, silence, and spiritual restoration. This book speaks directly to the woman who has learned to hide her wounds — and invites her into a space of healing, identity, and divine tenderness.",
  },
  {
    slug: "the-absent-father",
    title: "The Absent Father",
    author: "Pst. Delphine Nforgwei",
    image: "/images/writers/book4.jpg",
    description:
      "An honest reckoning with one of the most underaddressed wounds in a woman's life. The Absent Father explores how fatherlessness shapes identity — and how the love of a Heavenly Father is more than enough to make any woman whole.",
  },
  {
    slug: "a-single-girls-crowns",
    title: "A Single Girl's Crowns",
    author: "Pst. Delphine Nforgwei",
    image: "/images/writers/book5.jpg",
    description:
      "Singleness is not a waiting room — it is a throne room. This empowering declaration calls single women to walk in dignity, purpose, and spiritual authority: fully alive and fully crowned before any relationship begins.",
  },
  {
    slug: "call-me-mara",
    title: "Call Me Mara",
    author: "Pst. Delphine Nforgwei",
    image: "/images/writers/book6.jpg",
    description:
      "Named after the woman in the book of Ruth who said 'call me bitter,' this book is for every woman at her breaking point. It is a story of grief, surrender, and the miraculous way God restores what bitterness tried to take.",
  },
  {
    slug: "the-riches-of-his-grace",
    title: "The Riches of His Grace",
    author: "Pst. Delphine Nforgwei",
    image: "/images/writers/book7.jpg",
    description:
      "An exploration of divine abundance that transcends wealth, position, and circumstance. The Riches of His Grace invites women to discover what it means to live fully resourced — spiritually, emotionally, and in kingdom purpose.",
  },
];

const AuthorsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            Words That Elevate
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            The E-Woman Authors
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-foreground/60 max-w-2xl mx-auto text-base leading-relaxed">
            E-Woman is more than a conference — it is a Spirit-led movement shaped by voices of depth,
            conviction, and transformational insight. Our authors address identity, resilience, marriage,
            generational restoration, and spiritual authority — equipping women to rise in clarity and
            kingdom influence.
          </p>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 max-w-5xl mx-auto">
          {books.map((book, i) => (
            <Link
              key={book.slug}
              to={`/authors/${book.slug}`}
              className="reveal group relative overflow-hidden rounded-2xl shadow-lg bg-white/5 border border-white/10 hover:border-[#e0c55d]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl block"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Book cover */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Hover overlay with gold button */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <p className="text-white text-xs font-semibold text-center mb-3 leading-tight line-clamp-2">
                  {book.title}
                </p>
                <span className="btn-gold-gradient px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AuthorsSection;
