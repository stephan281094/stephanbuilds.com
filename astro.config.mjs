import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  adapter: cloudflare({ imageService: "compile" }),
  output: "server",
  image: {
    domains: ["picsum.photos"],
  },
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("keystatic"),
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["node:fs/promises", "medium-zoom"],
    },
  },
});
