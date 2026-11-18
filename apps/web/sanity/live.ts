import { defineLive } from "next-sanity/live";
import type { QueryParams } from "next-sanity";
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
 *
 * Draft perspective: the site is not live yet and website docs are drafts.
 * When SANITY_API_READ_TOKEN is present, default every fetch to
 * `previewDrafts` (published + drafts) so unpublished pages/nav render.
 * Without a token, keep the library default (published / draft-mode cookie).
 */
const live = defineLive({
  client: token ? client.withConfig({ token }) : client,
  serverToken: token,
  browserToken: token,
});

export const SanityLive = live.SanityLive;

type SanityFetch = typeof live.sanityFetch;

export const sanityFetch: SanityFetch = ((options) => {
  const perspective =
    options.perspective ?? (token ? ("previewDrafts" as const) : undefined);
  return live.sanityFetch(
    perspective ? { ...options, perspective } : options,
  );
}) as SanityFetch;

// Re-export for callers that need the raw QueryParams type.
export type { QueryParams };
