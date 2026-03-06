import { Clock, Mic, Users, Coffee, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";

const typeIcons: Record<string, React.ReactNode> = {
  keynote: <Mic size={18} />,
  panel: <Users size={18} />,
  workshop: <Users size={18} />,
  break: <Coffee size={18} />,
  ceremony: <Award size={18} />,
};

const typeColors: Record<string, string> = {
  keynote: "border-gold",
  panel: "border-foreground/40",
  workshop: "border-accent",
  break: "border-foreground/20",
  ceremony: "border-white",
};

const Schedule = () => {
  const { content } = useContent();
  const c = content!;

  return (
    <div>
      <section className="py-20 gradient-dark">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Schedule</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {c.site.dateDisplay} — A full day of inspiration, connection, and growth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 max-w-3xl">
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-white/15 hidden sm:block" />

            <div className="space-y-4">
              {c.schedule.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 sm:gap-6">
                  <div className="hidden sm:flex flex-col items-center pt-6">
                    <div className={`w-3 h-3 rounded-full border-2 ${typeColors[item.type]} bg-white/90 z-10`} />
                  </div>

                  <div
                    className={`flex-1 p-5 sm:p-6 border-l-4 ${typeColors[item.type]} rounded-2xl shadow-sm`}
                    style={{ background: "rgba(255,255,255,0.92)" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "rgba(26,0,31,0.55)" }}>
                        <Clock size={14} />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#a87e02" }}>
                        {typeIcons[item.type]}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-1" style={{ color: "#1a001f" }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: "rgba(26,0,31,0.65)" }}>{item.description}</p>
                    {item.speaker && (
                      <p className="text-sm mt-2 font-medium" style={{ color: "#d4198a" }}>{item.speaker}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY REGISTER */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 p-4 z-50">
        <Link
          to="/register"
          className="block w-full text-center bg-white py-3 rounded-full font-semibold text-lg shadow-lg"
          style={{ color: "#d4198a" }}
        >
          Secure Your Seat – 50,000 FCFA
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
