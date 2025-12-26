import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../lib/satori";

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export async function GET({ props }: APIContext) {
  const ogImage = await generateOgImage({
    title: props.data.title,
    description: props.data.description,
  });

  return new Response(Uint8Array.from(ogImage), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
