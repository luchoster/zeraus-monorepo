# zera.us — v3 monorepo

| path | what | stack |
|---|---|---|
| `apps/web` | zera.us website | Next.js 16 (App Router, Turbopack), React 19, GSAP/Lenis — built on the Rayo "software development company" layout, brand-skinned for ZERAus |
| `apps/studio` | Sanity Studio + business tools (invoices, expenses, leads) | Sanity v5 |
| `packages/sanity-config` | single source of truth for `projectId` / `dataset` / `apiVersion` used by **both** apps | TS |
| `docs/SCHEMA_PLAN.md` | the content-model redesign + migration plan | — |

Both apps talk to the same Sanity project **`b80qy5y0`**, dataset **`zeraus`**.

## Setup

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
cp apps/studio/.env.example apps/studio/.env   # or reuse your existing cms/.env
pnpm dev            # web on :3000, studio on :3333
```

Useful:

```bash
pnpm dev:web | pnpm dev:studio
pnpm build          # turbo: builds both
pnpm typegen        # extracts the studio schema → apps/web/sanity/types.generated.ts
pnpm --filter @zeraus/studio deploy
pnpm --filter @zeraus/web block-previews   # regenerate page-builder thumbnails (needs dev:web running)
```

## Brand

Rayo's theme is driven by CSS custom properties; `apps/web/public/css/zeraus.css` overrides them with the zera.us palette (woodsmoke `#191919`, shark `#231f20`, light-blue `#0097d6`, cobalt `#324ba7`) and fonts (Jaapokki display, Proxima Nova body). Dark scheme is the default; the light scheme is kept as an inverted variant.

## Where things came from

- `apps/web` ← ThemeForest **Rayo** Next.js template (`home-software-development-company` as `/`), minus the demo videos we don't use.
- `apps/studio` ← previous `cms/` repo (`Warren-Burrows/zera-cms`), unchanged schemas for now; `package.json` pruned of Sanity v2 leftovers.
- v2 site (`luchoster/zera-us-next`, Next 10) is the content/brand reference only; nothing is imported from it except fonts, logo, favicons and the noise texture.
