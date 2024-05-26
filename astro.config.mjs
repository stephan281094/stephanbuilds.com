import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";
import keystatic from "@keystatic/astro";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  output: "hybrid",
  image: {
    domains: ["picsum.photos"],
  },
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("keystatic"),
    }),
    tailwind(),
    react(),
    markdoc(),
    keystatic(),
  ],
});
