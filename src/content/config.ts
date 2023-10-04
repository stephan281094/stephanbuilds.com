import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((str) => new Date(str)),
      hero: z
        .object({
          src: image(),
          caption: z.string(),
        })
        .optional(),
    }),
});

export const collections = { blog };
