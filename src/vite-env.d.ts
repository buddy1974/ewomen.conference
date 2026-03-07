/// <reference types="vite/client" />

declare module "virtual:gallery-manifest" {
  export const galleryAlbums: { slug: string; images: string[] }[];
}
