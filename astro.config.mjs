import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  adapter: cloudflare({ imageService: "compile" }),
  output: "server",
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("keystatic"),
    }),
    markdoc(),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["medium-zoom"],
    },
  },
});
