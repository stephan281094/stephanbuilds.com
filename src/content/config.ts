import { defineCollection, z } from "astro:content";

const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  draft: z.boolean().optional(),
  imageUrl: z.string(),
  when: z.string().or(z.number()),
  client: z
    .object({
      name: z.string(),
      website: z.string(),
    })
    .optional(),
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
      hero: z.object({
        src: image(),
        caption: z.string(),
      }),
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
