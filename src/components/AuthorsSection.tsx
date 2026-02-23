const books = [
  { image: "/images/writers/book-1.jpg", alt: "Book by E-Woman Speaker" },
  { image: "/images/writers/book-2.jpg", alt: "Book by E-Woman Speaker" },
  { image: "/images/writers/book-3.jpg", alt: "Book by E-Woman Speaker" },
  { image: "/images/writers/book4.jpg", alt: "Book by E-Woman Speaker" },
  { image: "/images/writers/book5.jpg", alt: "Book by E-Woman Speaker" },
  { image: "/images/writers/book6.jpg", alt: "Book by E-Woman Speaker" },
  { image: "/images/writers/book7.jpg", alt: "Book by E-Woman Speaker" },
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
          <div className="gold-divider mb-5" />
          <p className="text-foreground/60 max-w-xl mx-auto text-base leading-relaxed">
            Voices that have shaped lives. Our speakers don't just speak — they write. Discover the books behind the women.
          </p>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 max-w-5xl mx-auto">
          {books.map((book, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden rounded-2xl shadow-lg bg-white/5 border border-white/10 hover:border-[#e0c55d]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Book cover */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.image}
                  alt={book.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Hover overlay with gold button */}
              <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <a
                  href="https://delphine-nforgwei.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-gradient px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-12">
          <a
            href="https://delphine-nforgwei.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold shadow-xl hover:opacity-90 transition-opacity"
          >
            Explore All Books →
          </a>
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
