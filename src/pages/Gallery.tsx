import { useContent } from "@/contexts/ContentContext";
import LightboxGallery from "@/components/LightboxGallery";

const Gallery = () => {
  const { content } = useContent();
  const c = content!;

  return (
    <div>
      <section className="py-20 gradient-dark">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-white max-w-2xl mx-auto">
            Moments captured from our previous editions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <LightboxGallery images={c.gallery.images} categories={c.gallery.categories} />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
