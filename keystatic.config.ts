import { config, fields, collection } from "@keystatic/core";

const projectSchema = {
  id: fields.integer({ label: "Project order" }),
  title: fields.slug({ name: { label: "Title" } }),
  description: fields.text({ label: "Description", multiline: true }),
  imageUrl: fields.text({ label: "Hero image " }),
  imageAlt: fields.text({ label: "Hero Alt" }),
  draft: fields.checkbox({ label: "Draft" }),
  when: fields.text({ label: "When" }),
  client: fields.conditional(
    fields.checkbox({ label: "Has client", defaultValue: false }),
    {
      true: fields.object({
        name: fields.text({ label: "Name" }),
        website: fields.url({ label: "Website" }),
      }),
      false: fields.empty(),
    },
  ),
  content: fields.markdoc({ label: "Content" }),
};

export default config({
  storage: {
    kind: import.meta.env.MODE === "production" ? "github" : "local",
    repo: {
      owner: "stephan281094",
      name: "stephanbuilds.com",
    },
  },
  collections: {
    pages: collection({
      label: "Pages",
      entryLayout: "content",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            publicPath: ".",
          },
        }),
      },
    }),
    posts: collection({
      label: "Posts",
      entryLayout: "content",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        pubDate: fields.date({ label: "Date published" }),
        hero: fields.image({
          label: "Hero Image",
          publicPath: ".",
        }),
        heroAlt: fields.text({ label: "Hero Alt" }),
        draft: fields.checkbox({ label: "Draft" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    projects: collection({
      label: "Projects",
      entryLayout: "content",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "content" },
      schema: projectSchema,
    }),
    "side-projects": collection({
      label: "Side projects",
      entryLayout: "content",
      slugField: "title",
      path: "src/content/side-projects/*",
      format: { contentField: "content" },
      schema: projectSchema,
    }),
  },
});
