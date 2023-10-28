import { defineCollection, z } from "astro:content";

const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  draft: z.boolean().optional(),
  imageUrl: z.string(),
  imageAlt: z.string().optional(),
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
      hero: image(),
      heroAlt: z.string(),
    }),
});

const projects = defineCollection({
  schema: projectSchema,
});

const sideProjects = defineCollection({
  schema: projectSchema,
});

const pages = defineCollection({
  schema: z.object({}),
});

export const collections = {
  blog,
  pages,
  projects,
  "side-projects": sideProjects,
};
