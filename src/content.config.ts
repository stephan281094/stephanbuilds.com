import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, type ImageFunction } from "astro:content";

function projectSchema(image: ImageFunction) {
  return z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    hero: image().optional(),
    heroAlt: z.string().optional(),
    when: z.string().or(z.number()),
    client: z.union([
      z.object({
        discriminant: z.literal(false),
      }),
      z.object({
        discriminant: z.literal(true),
        value: z.object({
          name: z.string(),
          website: z.string(),
        }),
      }),
    ]),
  });
}

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((str) => new Date(str)),
      hero: image(),
      heroAlt: z.string(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/projects" }),
  schema: ({ image }) => projectSchema(image),
});

const sideProjects = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/side-projects" }),
  schema: ({ image }) => projectSchema(image),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/pages" }),
  schema: z.object({}),
});

export const collections = {
  blog,
  pages,
  projects,
  "side-projects": sideProjects,
};
