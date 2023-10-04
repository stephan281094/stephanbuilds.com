import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../lib/satori";

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const get: APIRoute = async function get({ props }) {
  const ogImage = await generateOgImage({
    title: props.data.title,
    description: props.data.description,
  });

  return new Response(ogImage, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
