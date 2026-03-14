import type { APIContext } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImage } from "../../lib/satori";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export async function GET({
  props,
}: APIContext<{ post: CollectionEntry<"blog"> }>) {
  const ogImage = await generateOgImage({
    title: props.post.data.title,
    description: props.post.data.description,
  });

  return new Response(Uint8Array.from(ogImage), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
