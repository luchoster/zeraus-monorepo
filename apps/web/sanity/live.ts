import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

/**
 * `sanityFetch` for server components + `<SanityLive />` in the root layout.
 * Content updates in the Studio are pushed to the site without a rebuild.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
