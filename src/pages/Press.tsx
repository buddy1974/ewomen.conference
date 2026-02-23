import { Download, Mail, Phone, FileText } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const fileIcons: Record<string, React.ReactNode> = {
  PDF: <FileText size={20} />,
  ZIP: <FileText size={20} />,
};

const Press = () => {
  const { content } = useContent();
  const c = content!;

  return (
    <div>
      <section className="py-20 gradient-dark">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{c.press.title}</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">{c.press.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 max-w-3xl">
          <h2 className="font-display text-2xl font-bold mb-6">Downloadable Documents</h2>
          <div className="space-y-3">
            {c.press.documents.map((doc: any, i: number) => (
              <a
                key={i}
                href={doc.url}
                className="glass-card p-5 flex items-center gap-4 hover:bg-white/15 transition group"
              >
                <div className="p-2 glass-card rounded-lg">
                  {fileIcons[doc.type] || <FileText size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{doc.name}</h3>
                  <p className="text-xs text-foreground/50">{doc.type} · {doc.size}</p>
                </div>
                <Download size={18} className="text-foreground/40 group-hover:text-accent transition" />
              </a>
            ))}
          </div>

          <div className="glass-card-strong p-8 mt-12">
            <h2 className="font-display text-2xl font-bold mb-4">Media Contact</h2>
            <p className="text-foreground/60 mb-4">{c.press.contact.name}</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${c.press.contact.email}`} className="inline-flex items-center gap-2 text-accent hover:underline text-sm">
                <Mail size={16} /> {c.press.contact.email}
              </a>
              <a href={`tel:${c.press.contact.phone}`} className="inline-flex items-center gap-2 text-accent hover:underline text-sm">
                <Phone size={16} /> {c.press.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Press;
