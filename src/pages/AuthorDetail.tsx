import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { books } from "@/components/AuthorsSection";

const WA_NUMBER = "237683493220";

const AuthorDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    return (
      <div className="min-h-screen gradient-dark flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl font-bold text-white">Book Not Found</h1>
          <p className="text-white">This book doesn't exist or has been moved.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 btn-gold-gradient px-6 py-3 rounded-full font-semibold mt-4"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const waMessage = encodeURIComponent(`Hello, I'm interested in the book "${book.title}" from E-WOMAN 2026`);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-background">

      {/* Hero — book cover blurred backdrop */}
      <section
        className="relative py-28 md:py-36 flex items-end overflow-hidden"
        style={{ minHeight: 480 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url('${book.image}')`, filter: "blur(18px) brightness(0.35)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,0,31,0.4) 0%, rgba(26,0,31,0.95) 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 container px-4">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-end max-w-4xl">

            {/* Book cover */}
            <div className="flex-shrink-0">
              <div className="w-[180px] sm:w-[220px] shadow-[0_20px_60px_rgba(212,25,138,0.35)] rounded-xl overflow-hidden border border-white/10">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Meta */}
            <div className="space-y-3 pb-2">
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "#e0c55d" }}>
                E-Woman Authors
              </p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {book.title}
              </h1>
              <div className="gold-divider mx-0" style={{ margin: 0 }} />
              <p className="text-white text-sm font-medium italic">
                Featured at E-WOMAN Conference 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="container px-4 max-w-3xl">

          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-white transition mb-10"
          >
            <ArrowLeft size={15} /> Back to Authors
          </Link>

          {/* About the Book */}
          <div className="space-y-5 mb-14">
            <h2 className="font-display text-2xl font-bold" style={{ color: "#d4198a" }}>
              About This Book
            </h2>
            <div className="gold-divider mx-0" style={{ margin: 0 }} />
            <p className="text-white text-lg leading-relaxed">
              {book.description}
            </p>
            <p className="text-white leading-relaxed">
              This book is part of the growing E-Woman library — a curated collection of Spirit-led
              literature by women who have not only survived their stories, but transformed them into
              tools of liberation, identity, and kingdom advancement for others.
            </p>
          </div>

          {/* About the Author */}
          <div
            className="rounded-2xl p-6 mb-14 border border-[#d4198a]/20"
            style={{ background: "linear-gradient(135deg, rgba(212,25,138,0.06), rgba(224,197,93,0.04))" }}
          >
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#e0c55d" }}>About the Author</p>
            <p className="text-white text-sm leading-relaxed">
              This book is authored by one of the distinguished guest speakers and authors
              featured at E-WOMAN 2026 — women of spiritual depth, personal conviction, and
              transformational impact. Their stories and writings have shaped communities across
              Africa and beyond.
            </p>
            <p className="text-white text-xs mt-3 italic">
              Full author details available at the conference.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center space-y-3 mb-12">
            <p className="text-white text-sm">Want to enquire about this book?</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base shadow-lg transition hover:scale-105"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle size={20} fill="white" />
              Enquire on WhatsApp
            </a>
            <p className="text-white text-xs">+237 6 83 49 32 20</p>
          </div>

          {/* Back CTA */}
          <div className="pt-8 border-t border-white/10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn-gold-gradient px-7 py-3 rounded-full font-semibold text-sm shadow-lg hover:opacity-90 transition"
            >
              <ArrowLeft size={15} /> Back to Home
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AuthorDetail;
