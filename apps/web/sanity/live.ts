import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

if (!token && process.env.NODE_ENV === "development") {
  console.warn(
    "[sanity] SANITY_API_READ_TOKEN is not set. The `zeraus` dataset is private, so every query returns null until a Viewer token is added to apps/web/.env.local.",
  );
}

/**
 * `sanityFetch` for server components + `<SanityLive />` in the root layout.
 * Content updates in the Studio are pushed to the site without a rebuild.
 *
 * The dataset is private (it also holds invoices/clients), so reads need a
 * Viewer token. `defineLive` only applies `serverToken` to draft fetches and
 * uses the client's own token for published content, so the token goes on the
 * client itself (this module only runs on the server). `browserToken` is sent
 * to the browser only while draft mode (Presentation) is on.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client: token ? client.withConfig({ token }) : client,
  serverToken: token,
  browserToken: token,
});
