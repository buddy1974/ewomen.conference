import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const SpeakerDetail = () => {
  const { slug } = useParams();
  const { content } = useContent();
  const c = content!;
  const speaker = c.speakers.find((s: any) => s.slug === slug);

  if (!speaker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Speaker not found</h1>
          <Link to="/speakers" className="text-white underline hover:text-white">
            ← Back to Speakers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <Link
          to="/speakers"
          className="inline-flex items-center gap-2 text-white hover:text-white transition mb-8"
        >
          <ArrowLeft size={16} /> Back to Speakers
        </Link>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{speaker.name}</h1>
            <p className="text-white">{speaker.title}</p>
            <p className="font-medium" style={{ color: "#e0c55d" }}>{speaker.topic}</p>
            <p className="text-white leading-relaxed">{speaker.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetail;
