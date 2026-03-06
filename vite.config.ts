import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// ── Gallery manifest plugin ────────────────────────────────────────────────
// Reads public/images/gallery/{delaware,yaounde} at build time and exposes
// a virtual module so the gallery page never hardcodes filenames.
function galleryManifestPlugin(): Plugin {
  const VIRTUAL_ID = "virtual:gallery-manifest";
  const RESOLVED_ID = "\0" + VIRTUAL_ID;
  const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
  // Exclude WordPress-generated resized variants (e.g. img-150x150.jpg, img-scaled.jpg)
  const EXCLUDE = /(-\d+x\d+|-scaled)(\.\w+)$/i;

  const readImages = (folder: string): string[] => {
    const dir = path.resolve(__dirname, "public/images/gallery", folder);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(
        (e) =>
          e.isFile() &&
          IMAGE_EXT.has(path.extname(e.name).toLowerCase()) &&
          !EXCLUDE.test(e.name)
      )
      .map((e) => `/images/gallery/${folder}/${e.name}`)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  };

  return {
    name: "gallery-manifest",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const delaware = readImages("delaware");
      const yaounde = readImages("yaounde");
      return [
        `export const delawareImages = ${JSON.stringify(delaware)};`,
        `export const yaoundeImages = ${JSON.stringify(yaounde)};`,
      ].join("\n");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), galleryManifestPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
