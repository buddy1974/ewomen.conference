import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

import CountdownTimer from "@/components/CountdownTimer";
import TestimonialSlider from "@/components/TestimonialSlider";
import HeroSlider from "@/components/HeroSlider";
import AuthorsSection from "@/components/AuthorsSection";
import VisionariesSection from "@/components/VisionariesSection";

const Index = () => {
  const { content } = useContent();
  const c = content!;

  return (
    <div>
      {/* HERO — fullscreen fade slider */}
      <HeroSlider />

      {/* TRUST STRIP */}
      <section className="py-10 bg-background border-y border-white/10 reveal">
        <div className="container px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-accent/70 mb-6">
            A Growing Movement
          </p>
          <div className="flex flex-wrap justify-center gap-10 text-foreground/70 text-sm">
            <span>500+ Women Impacted</span>
            <span>2 Continents</span>
            <span>Yaoundé • Delaware</span>
            <span>Life-Changing Testimonies</span>
          </div>
        </div>
      </section>

      {/* CONVENER */}
      <section className="py-28 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal relative flex justify-center md:justify-start">
              <div className="relative before:absolute before:-inset-6 before:rounded-3xl before:bg-accent/10 before:blur-3xl before:-z-10">
                <div className="w-[300px] sm:w-[340px] md:w-[380px] aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <img
                    src={c.convener.image}
                    alt={c.convener.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-2 text-center md:text-left space-y-6 max-w-xl mx-auto md:mx-0">
              <p className="text-sm uppercase tracking-widest text-accent/80">
                Convener
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                {c.convener.name}
              </h2>
              <p className="text-foreground/60 text-sm sm:text-base">
                {c.convener.title}
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {c.convener.bio}
              </p>
              <p className="text-accent italic text-base font-medium">
                "{c.convener.mission}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold text-center mb-4">
            {c.about.title}
          </h2>
          <p className="reveal reveal-delay-1 text-center text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {c.about.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.about.highlights.map((h: any, i: number) => (
              <div
                key={h.label}
                className="reveal glass-card p-6 text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-accent mb-2">
                  {h.number}
                </div>
                <div className="text-sm text-foreground/60">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SPEAKERS */}
      <section className="py-20 gradient-dark">
        <div className="container px-4">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            Featured Speakers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.speakers.slice(0, 3).map((speaker: any, index: number) => (
              <Link
                key={speaker.slug}
                to={`/speakers/${speaker.slug}`}
                className="reveal glass-card overflow-hidden group hover:bg-white/15 transition-all block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-1">{speaker.name}</h3>
                  <p className="text-sm text-foreground/60 mb-2">{speaker.title}</p>
                  <p className="text-sm text-accent">{speaker.topic}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="reveal reveal-delay-3 text-center mt-10">
            <Link
              to="/speakers"
              className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full hover:bg-white/20 transition font-medium"
            >
              View All Speakers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            What Attendees Say
          </h2>
          <div className="reveal reveal-delay-1">
            <TestimonialSlider testimonials={c.testimonials} />
          </div>
        </div>
      </section>

      {/* AUTHORS */}
      <AuthorsSection />

      {/* VISIONARIES */}
      <VisionariesSection />

      {/* CTA */}
      <section className="py-20 gradient-dark">
        <div className="container px-4 text-center">
          <h2 className="reveal font-display text-3xl sm:text-4xl font-bold mb-4">
            Don't Miss This Moment
          </h2>
          <p className="reveal reveal-delay-1 text-foreground/70 max-w-xl mx-auto mb-2">
            Spaces are limited. Secure your seat at {c.site.name}.
          </p>
          <p className="reveal reveal-delay-1 text-foreground/50 text-sm mb-4">
            Limited seating available. Early registration strongly advised.
          </p>
          <p className="reveal reveal-delay-2 text-accent font-bold text-xl mb-8">
            {c.site.registrationFee}
          </p>
          <Link
            to="/register"
            className="reveal reveal-delay-3 inline-flex items-center justify-center gap-2 bg-white !text-magenta px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:!text-magenta-dark transition-all duration-200 shadow-lg"
          >
            Register Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* MOBILE STICKY REGISTER */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 p-4 z-50">
        <Link
          to="/register"
          className="block w-full text-center bg-white !text-magenta py-3 rounded-full font-semibold text-lg hover:bg-white hover:!text-magenta-dark transition-all duration-200 shadow-lg"
        >
          Register – {c.site.registrationFee}
        </Link>
      </div>
    </div>
  );
};

export default Index;
