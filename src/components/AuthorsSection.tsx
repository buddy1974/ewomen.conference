import { Link } from "react-router-dom";

export const books = [
  {
    slug: "the-resilience-code",
    title: "The Resilience Code",
    author: "E-Woman Guest Author",
    image: "/images/writers/book-1.jpg",
    description:
      "What happens when adversity becomes your classroom? The Resilience Code decodes the hidden architecture of breakthrough — revealing how women of faith can turn every setback into a stepping stone toward their God-given destiny. This book equips readers with practical and spiritual tools to navigate life's most brutal seasons without losing their identity, their peace, or their purpose.",
  },
  {
    slug: "conflict-management-and-resolution-in-marriage",
    title: "Conflict Management and Resolution in Marriage",
    author: "E-Woman Guest Author",
    image: "/images/writers/book-2.jpg",
    description:
      "Every marriage will face moments of tension — the question is not whether conflict comes, but whether you have the tools to transform it. This book draws from biblical wisdom and real-world insight to equip couples with practical strategies for navigating disagreement, rebuilding trust, and creating a home where love and grace consistently win.",
  },
  {
    slug: "a-girl-without-tears",
    title: "A Girl Without Tears",
    author: "E-Woman Guest Author",
    image: "/images/writers/book-3.jpg",
    description:
      "She learned not to cry. She built walls so high that even she couldn't see over them. A Girl Without Tears is a courageous exploration of emotional suppression, inherited pain, and the journey toward wholeness. Written for the woman who has survived by going numb — this book is a call back to feeling, to healing, and to the full expression of who God created her to be.",
  },
  {
    slug: "the-absent-father",
    title: "The Absent Father",
    author: "E-Woman Guest Author",
    image: "/images/writers/book4.jpg",
    description:
      "The absence of a father leaves a wound that shapes a woman's sense of worth, her expectations in relationships, and her posture before God. The Absent Father confronts this wound with honesty and compassion — walking readers through the grief of what was missing, the danger of searching for love in wrong places, and the transformative discovery of a Heavenly Father who has never left.",
  },
  {
    slug: "a-single-girls-crowns",
    title: "A Single Girl's Crowns",
    author: "E-Woman Guest Author",
    image: "/images/writers/book5.jpg",
    description:
      "Before the ring. Before the title. Before anyone else calls her chosen — she is already crowned. A Single Girl's Crowns is a declaration of identity, purpose, and divine worth for the woman in the season of singleness. It dismantles the lie that she is in a waiting room and reveals the truth: she is already on the throne.",
  },
  {
    slug: "call-me-mara",
    title: "Call Me Mara",
    author: "E-Woman Guest Author",
    image: "/images/writers/book6.jpg",
    description:
      "When life leaves you empty, grief has a name. Named after Naomi's declaration in the book of Ruth — 'Call me Mara, for the Almighty has dealt very bitterly with me' — this book is written for every woman standing at the intersection of loss and surrender. It is a story of bitterness transformed by encounter, and of how God restores what life tries to permanently take away.",
  },
  {
    slug: "the-riches-of-his-grace",
    title: "The Riches of His Grace",
    author: "E-Woman Guest Author",
    image: "/images/writers/book7.jpg",
    description:
      "Grace is not just unmerited favour — it is the inexhaustible wealth of heaven made available to every believing woman. The Riches of His Grace is a devotional and theological journey into Ephesians 1 and beyond, unpacking the lavish, boundless, and transformational nature of God's grace. Written for the woman who has tried hard enough and is ready to let God be enough.",
  },
];

const AuthorsSection = () => {
  return (
    <section id="authors" className="py-24 gradient-dark">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            Elevation Turned Into Legacy
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            E-Woman Authors
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-white/90 max-w-2xl mx-auto text-sm uppercase tracking-widest font-semibold mb-10">
            Women who turned transformation into legacy.
          </p>

          {/* Narrative introduction */}
          <div className="max-w-3xl mx-auto text-left space-y-5 bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white text-center">
              Meet the Authors Who Turned Their Elevation into a Legacy
            </h3>
            <div className="w-16 h-0.5 mx-auto" style={{ background: "#e0c55d" }} />

            <p className="text-white/90 text-base leading-relaxed font-semibold text-center italic">
              We don't just talk about transformation.
              <br />We track it.
            </p>

            <p className="text-white/80 text-base leading-relaxed">
              Last year, something remarkable happened.
            </p>

            <p className="text-white/80 text-base leading-relaxed">
              At the E-Woman Conference, Coach Dee didn't simply host an event — she ignited a movement.
              Women walked into that conference seeking clarity, growth, and direction. They walked out with
              more than inspiration. They left with a blueprint for their destinies.
            </p>

            <p className="text-white/80 text-base leading-relaxed">
              These authors are part of that story.
            </p>

            <p className="text-white/80 text-base leading-relaxed">
              They are living proof that when you invest in a woman's leadership, she doesn't just rise —
              she builds a ladder for others to follow.
            </p>

            <p className="text-white/80 text-base leading-relaxed">
              Each of these women took the principles shared through the 7 Pillars and turned them into
              something tangible: their voices, their books, and their legacy.
            </p>

            <p className="text-white/80 text-base leading-relaxed">
              They are a powerful reminder that the E-Woman experience doesn't end when the conference closes.
              For many, that is where the real journey begins.
            </p>

            <p className="text-white font-semibold text-base leading-relaxed text-center">
              Today we celebrate the authors who transformed elevation into legacy — women who took the
              7 Pillars and began building empires that will impact generations.
            </p>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {books.map((book, i) => (
            <Link
              key={book.slug}
              to={`/authors/${book.slug}`}
              className="reveal group relative overflow-hidden rounded-2xl shadow-xl bg-white/5 border border-white/10 hover:border-[#e0c55d]/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(212,25,138,0.3)] block"
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

              {/* Card footer — always visible */}
              <div className="px-4 py-4 bg-white/5 border-t border-white/10">
                <p className="text-white font-bold text-sm leading-snug mb-1 line-clamp-2">
                  {book.title}
                </p>
                <p className="text-white/60 text-xs">
                  Her journey is a testimony of transformation after the E-Woman experience.
                </p>
              </div>

              {/* Hover overlay with gold button */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <p className="text-white text-sm font-bold text-center mb-3 leading-tight line-clamp-2">
                  {book.title}
                </p>
                <span className="btn-gold-gradient px-5 py-2 rounded-full text-xs font-bold shadow-lg">
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
