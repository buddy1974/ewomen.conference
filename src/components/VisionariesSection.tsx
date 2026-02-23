const visionaries = [
  {
    name: "Pst. Delphine Nforgwei",
    title: "Founder & Convener, E-Woman Conference",
    bio: "A pastor, purpose coach, author and women's impact leader, Pst. Delphine Nforgwei founded the E-Woman Conference with a single conviction: that when women gather with intention, history shifts. From Yaoundé to Delaware, she has built a movement of purpose-driven women who refuse to be ordinary.",
    mission: "Helping women redefine empowerment and rise into their full calling, one woman at a time.",
    image: "/images/convener/delphine.jpg",
    link: "https://delphine-nforgwei.com",
  },
  {
    name: "The E-Woman Team",
    title: "A Circle of Committed Women",
    bio: "Behind every great conference is an even greater team. The E-Woman Conference is powered by a circle of women who believe in the power of community, collaboration, and intentional elevation. Together, they design experiences that transform lives.",
    mission: "Serving women who are ready to step into the fullness of who they were created to be.",
    image: "/images/gallery/yaounde-1.jpg",
    link: "/speakers",
  },
];

const VisionariesSection = () => {
  return (
    <section className="py-24" style={{ background: "linear-gradient(135deg, #1a0810 0%, #2d0a1f 50%, #1a0810 100%)" }}>
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#e0c55d" }}>
            The People Behind the Purpose
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The Visionaries Behind E-Woman
          </h2>
          <div className="gold-divider mb-5" />
          <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed">
            Great movements are born from bold visions and courageous hearts. Meet the leaders who dared to dream of a conference that would change women's lives.
          </p>
        </div>

        {/* Visionaries */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {visionaries.map((person, i) => (
            <div
              key={i}
              className={`reveal grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative flex justify-center">
                <div
                  className="absolute -inset-6 rounded-3xl blur-3xl opacity-30"
                  style={{ background: "radial-gradient(circle, #d4198a, transparent)" }}
                />
                <div className="relative w-[280px] sm:w-[320px] aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(212,25,138,0.25)] border border-[#d4198a]/20">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 text-center md:text-left">
                <div className="gold-divider md:mx-0 md:ml-0" style={{ margin: "0 auto 0 0" }} />
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {person.name}
                </h3>
                <p className="text-sm font-medium tracking-wide" style={{ color: "#e0c55d" }}>
                  {person.title}
                </p>
                <p className="text-white/70 leading-relaxed text-base">
                  {person.bio}
                </p>
                <p className="italic text-base font-medium" style={{ color: "#ff33aa" }}>
                  "{person.mission}"
                </p>
                <a
                  href={person.link}
                  target={person.link.startsWith("http") ? "_blank" : undefined}
                  rel={person.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="btn-gold-gradient inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionariesSection;
