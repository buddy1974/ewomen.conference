const visionaries = [
  {
    name: "Pst. Delphine Nforgwei",
    title: "Founder & Convener, E-Woman Conference",
    bio: "A pastor, purpose coach, author and women's impact leader, Pst. Delphine Nforgwei founded the E-Woman Conference with a single conviction: that when women gather with intention, history shifts. From Yaoundé to Delaware, she has built a movement of purpose-driven women who refuse to be ordinary.",
    mission: "Helping women redefine empowerment and rise into their full calling, one woman at a time.",
    image: "/images/convener/delphine.jpg",
    imageAlt: "Pst. Delphine Nforgwei — Founder and Convener of E-Woman Conference",
    link: "https://delphine-nforgwei.com",
    flyer: false,
  },
  {
    name: "The E-Woman Team",
    title: "The Women Behind the Movement",
    bio: "Behind every powerful conference is a committed team working faithfully behind the scenes.\n\nThe E-Woman Conference is supported by a circle of dedicated women who contribute their time, leadership, and expertise to ensure the vision becomes a transformational experience for every participant.\n\nFrom planning and coordination to communication and hospitality, this team works tirelessly to make the E-Woman gathering a platform that empowers women to rise in purpose, leadership, and legacy.\n\nTogether, they help turn the E-Woman vision into a movement that continues to impact women across communities and nations.",
    mission: "Serving women who are ready to step into the fullness of who they were created to be.",
    image: "/images/theteambehind.jpeg",
    imageAlt: "The E-Woman organizing team working behind the scenes of the E-Woman Conference",
    link: "",
    flyer: true,
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
          <p className="text-white max-w-xl mx-auto text-base leading-relaxed">
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
              {/* Image — portrait card for individuals, full flyer for team */}
              <div className="relative flex justify-center">
                {!person.flyer && (
                  <div
                    className="absolute -inset-6 rounded-3xl blur-3xl opacity-30"
                    style={{ background: "radial-gradient(circle, #d4198a, transparent)" }}
                  />
                )}
                <div
                  className={
                    person.flyer
                      ? "relative w-full max-w-[560px]"
                      : "relative w-[280px] sm:w-[320px] aspect-[4/5] overflow-hidden"
                  }
                  style={
                    person.flyer
                      ? { borderRadius: 16, boxShadow: "0 16px 48px rgba(0,0,0,0.35)", overflow: "hidden" }
                      : { borderRadius: 16, boxShadow: "0 20px 60px rgba(212,25,138,0.25)", border: "1px solid rgba(212,25,138,0.2)" }
                  }
                >
                  <img
                    src={person.image}
                    alt={person.imageAlt}
                    className={person.flyer ? "w-full h-auto block" : "w-full h-full object-cover"}
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
                {person.flyer ? (
                  <div className="space-y-4">
                    {person.bio.split("\n\n").map((para, j) => (
                      <p key={j} className="text-white leading-relaxed text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-white leading-relaxed text-base">{person.bio}</p>
                )}
                <p className="italic text-base font-medium" style={{ color: "#ff33aa" }}>
                  "{person.mission}"
                </p>
                {person.link && (
                  <a
                    href={person.link}
                    target={person.link.startsWith("http") ? "_blank" : undefined}
                    rel={person.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="btn-gold-gradient inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Learn More →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionariesSection;
