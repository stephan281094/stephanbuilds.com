import { makeHandler } from "@keystatic/astro/api";
import type { APIContext } from "astro";
import config from "../../../../keystatic.config";

export const all = ({ ...params }: APIContext) => {
  // if (import.meta.env.MODE === "production") {
  //   return params.redirect("/", 307);
  // }

  return makeHandler({ config })(params);
};

export const prerender = false;
