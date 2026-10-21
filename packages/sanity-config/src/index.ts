/**
 * Shared Sanity connection settings.
 *
 * Both apps point at the SAME project + dataset:
 *   - apps/web    reads NEXT_PUBLIC_SANITY_*  (Next.js inlines these in the client bundle)
 *   - apps/studio reads SANITY_STUDIO_*       (Sanity CLI / Vite inlines these)
 *
 * The literal fallbacks are the existing zera.us project so a fresh checkout
 * works without any env file. Override via env when pointing at another dataset
 * (e.g. a `staging` dataset while the schema migration is in progress).
 */

const env = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>

export const SANITY_PROJECT_ID =
  env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? env.SANITY_STUDIO_PROJECT_ID ?? env.SANITY_PROJECT_ID ?? 'b80qy5y0'

export const SANITY_DATASET =
  env.NEXT_PUBLIC_SANITY_DATASET ?? env.SANITY_STUDIO_DATASET ?? env.SANITY_DATASET ?? 'zeraus'

/** Pin the API version per release; bump deliberately. */
export const SANITY_API_VERSION = env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-10-01'

/** Where the deployed Studio lives (used for Presentation / preview links). */
export const SANITY_STUDIO_URL = env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? env.SANITY_STUDIO_URL ?? 'http://localhost:3333'

export const sanityConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  studioUrl: SANITY_STUDIO_URL,
} as const

export type SanityConfig = typeof sanityConfig
