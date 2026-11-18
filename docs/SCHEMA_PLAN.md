# zera.us v3 — Sanity schema redesign plan

Goal: keep **one Sanity project/dataset** (`b80qy5y0` / `zeraus`) serving both the Studio (`apps/studio`) and the new Next.js 16 site (`apps/web`, Rayo "software development company" layout), reshape the *website* content model to match the new components, migrate the content we already have into it, and leave the business tooling (invoices, expenses, clients, leads) untouched.

Status legend: ✅ done in this repo · 🔜 next · 🧭 later

---

## 0. Ground rules

1. **Business/admin types are frozen.** `invoices`, `invoiceItem`, `clients`, `expenses`, `expense_category`, `bookCallForm`/`bookCallFormData`, `contactForm`/`contactFormData`, `project`, `person` keep their exact names and fields. The Invoices/Expenses tools, the Form Submissions dashboard widget and the `send-invoice-email` Sanity Function depend on them (see §6 for the exact field list).
2. **Website types are rebuilt, not patched.** The old homepage is a fixed set of fields (`hero_title`, `about_block`, `services[]`, `projects[]`, `contact_section`). The Rayo layout is a *stack of sections*, so the new home/pages are **page-builder documents** (`sections[]` of typed objects), with reusable entities (`service`, `caseStudy`, `partner`, `techStack`, `testimonial`, `post`) as their own documents referenced from sections.
3. **Old types stay registered (hidden) until migration is verified**, then are removed in one commit together with the migration cleanup.
4. Everything new is written with `defineType`/`defineField`/`defineArrayMember` in TypeScript, under `apps/studio/schemas/web/`, and typed in the frontend via `sanity typegen` → `apps/web/sanity/types.generated.ts` (config already in `apps/studio/sanity-typegen.json`).
5. All new fields are `camelCase`; old `snake_case` fields are mapped in the migration, not kept.
6. **Long copy is Portable Text.** Anything that is not a heading/subheading and can hold more than one sentence is `simplePortableText` (paragraphs + bold/italic/links) or `portableText` (full rich text). Plain `string`/`text` is only for headings, short labels, captions with deliberate line breaks (hero caption, stat labels) and meta descriptions.

---

## 1. What the new home page needs (component → data)

Rayo `home-software-development-company`, in render order, and what each block reads:

| # | Component | Data it needs | Source today | New source |
|---|---|---|---|---|
| 1 | `Hero` | caption (3 lines), wordmark, marquee media (videos/images), divider video | hard-coded | `heroSection` |
| 2 | `MarqueeSlider` | list of words | hard-coded | `marqueeSection` |
| 3 | `Services` (5 cards, bento) | title, tags[], description, illustration, card color/size | hard-coded | `servicesSection` → `service` refs |
| 4 | `About` | heading, paragraph, 2 lists of values, CTA | hard-coded | `aboutSection` |
| 5 | `ParallaxBanner` | one wide image | CSS class → file | `imageDividerSection` |
| 6 | `Capabilities` | title, CTA, items {title, num, mainImage, hoverImage} | `capabilities.json` | `capabilitiesSection` → `service` refs |
| 7 | `Projects` (pinned) | title, description, CTA, 5 projects {title, description, tags, preview image, url} | `projects.json` + CSS | `caseStudiesSection` → `caseStudy` refs |
| 8 | `TechStacks` | title, items {name, logo} | hard-coded SVGs | `techStackSection` → `techStack` refs |
| 9 | `MarqueeSlider2` | one sentence | hard-coded | `marqueeSection` |
| 10 | `Facts` | 4 stats {number, suffix, description, icon} | `facts-simple.json` | `statsSection` |
| 11 | `ParallaxDivider` | one wide image | CSS class | `imageDividerSection` |
| 12 | `Blogs` *(dropped from home for v3.0, back when posts exist)* | 3 latest posts | `blogs.json` | `latestPostsSection` → `post` |
| 13 | `Cta` | caption, CTA, 2 floating images | hard-coded | `ctaSection` |
| — | `Header1` / `MobileMenu` | logo, menu items, header CTA, promo caption + video | `menu.json` | `siteSettings` + `navigation` |
| — | `Footer2` | wordmark, nav, legal links, newsletter, socials, copyright | `footer-nav.json`, `socials.json` | `siteSettings` + `navigation` |

Other Rayo pages we will keep: `services` (→ `service` list + detail), `works-simple` → **`/our-work`** (`caseStudy` list), `project-details` → `/our-work/[slug]`, `about-us`, `contact` (+ `/book-a-call` form), `blog-standard`/`blog-article` → `/insights` + `/insights/[slug]` (phase 3), `404`. Plus our own **`/make-a-payment`** (not in Rayo; ported from v2).

---

## 2. Target content model

### 2.1 Singletons

#### `siteSettings` (reshaped, same `_id: siteSettings`)
| field | type | notes |
|---|---|---|
| `title` | string | "ZERAus" |
| `tagline` | string | "Digital Studio" |
| `siteUrl` | url | was `site_url` |
| `logo` / `logoLight` | image | dark/light scheme variants |
| `wordmark` | string | footer/hero text, default "zera.us" |
| `contactEmail` | string | was `main_contact_email` |
| `phone`, `address` | string / text | footer card |
| `socialLinks[]` | `socialLink` {label, url, platform (list)} | was `social_links[]{title,url,icon}` |
| `headerCta` | `link` | "Book a Call" |
| `menuPromo` | {caption, video (file), poster (image)} | the mobile-menu promo card |
| `newsletter` | {enabled, heading, provider (list: formspree/resend), endpoint} | footer SubscribeForm |
| `legalLinks[]` | `link` | Privacy / Terms |
| `seo` | `seo` | site-wide defaults (was `description`, `keywords`, `author`, `seo_image`) |
| `analytics` | {gaId} | was `NEXT_PUBLIC_GA_ID` |
| `defaultColorScheme` | string list dark/light | brand default = dark |

#### `navigation` (new singleton, `_id: navigation`) — replaces unregistered `main_menu`
| field | type |
|---|---|
| `mainMenu[]` | `navItem` {label, link: `link`, image (menu hover image, from old `menuPages.image`), children[] navItem} |
| `footerMenu[]` | `navItem` |

#### `homePage` (reshaped, same `_id: homePage`)
| field | type |
|---|---|
| `title` | string (internal) |
| `sections[]` | page builder — see §2.3 |
| `seo` | `seo` |

### 2.2 Entity documents (reusable, referenced from sections)

| type | fields | replaces |
|---|---|---|
| **`service`** | `title`, `slug`, `shortTitle`, `excerpt` (text), `body` (portableText), `tags[]` (string), `illustration` (image), `cardImage`/`hoverImage` (image, for Capabilities), `icon` (image/svg), `order` (number), `featured` (bool), `seo` | `homePage.services[]` (`services_single`), `page.content[].services` |
| **`caseStudy`** | `title`, `slug`, `tagline` (the "description" after the title in Projects), `client` (string), `clientLogo` (image), `tags[]`, `previewImage` (image, hotspot), `heroImage`, `gallery[]`, `url` (external site), `year`, `services[]` → ref service, `challenge`/`solution`/`results` (portableText), `testimonial` → ref, `featured`, `order`, `seo` | `portfolio.portfolio_item[]` **and** `homePage.projects[]` (`section_projects`) — merged into one list, home picks `featured` |
| **`partner`** | `name`, `logo` (image, svg ok), `logoLight`, `url`, `order` | `homePage.partners_marquee[]` (`partners_logo`) |
| **`techStack`** | `name`, `logo` (image/svg), `url`, `category` (list: frontend/backend/cms/infra/design/ai), `order` | hard-coded SVGs in `TechStacks.tsx` |
| **`testimonial`** | `quote` (text), `author`, `role`, `company`, `avatar`, `caseStudy` → ref | new |
| **`teamMember`** | `name`, `role`, `photo`, `bio`, `socialLinks[]`, `order` | new (about-us / team) |
| **`post`** | keep + add: `excerpt`, `categories[]` → `category`, `author` → `teamMember`, `coverImage` (rename `mainImage`), `seo` | `post` (fix broken `author.name` preview) |
| **`category`** | `title`, `slug` | new |
| **`page`** | `title` (was `pageTitle`), `slug`, `sections[]` (page builder), `seo` | `page` (was `content[]` with 4 section types) |
| **`faq`** | `question`, `answer` (portableText), `group` | new (Rayo FAQ block, services page) |

### 2.3 Section objects (the page builder: `sections[]` on `homePage` and `page`)

Every section object has a hidden-ish `_key`, an optional `anchor` (slug) and `theme` (list: default/accent/additional/opposite — maps to Rayo's `bg-*` classes) via a shared `sectionBase` fieldset.

| object | fields | Rayo block |
|---|---|---|
| `heroSection` | `caption` (text, 3 lines), `wordmark` (string, default from settings), `media[]` ({kind: video/image, file/image, animation: list move/rotate-slow/pulse-small}), `dividerVideo` (file + poster) | `mxd-hero-03` |
| `marqueeSection` | `items[]` (string), `direction` (left/right), `muted` (bool) | `MarqueeSlider`, `MarqueeSlider2` |
| `servicesSection` | `services[]` → ref service (max 5), per-item overrides `layout[]` ({service ref, size: wide/normal, theme}) | `mxd-services-cards-s` |
| `aboutSection` | `heading`, `paragraph` (text), `valuesLeft[]`, `valuesRight[]` (string), `cta` (`link`) | `About` |
| `imageDividerSection` | `image` (image, hotspot), `parallaxScale` (number) | `ParallaxBanner`/`ParallaxDivider` |
| `capabilitiesSection` | `heading`, `cta` (`link`), `services[]` → ref service | `mxd-cpb-list` |
| `caseStudiesSection` | `heading`, `description` (text), `cta` (`link`), `caseStudies[]` → ref caseStudy (max 6) *(empty → featured)* | `mxd-pinned-projects` |
| `techStackSection` | `heading`, `items[]` → ref techStack | `mxd-tech-stack-cards` |
| `statsSection` | `stats[]` {value (number), suffix, label (text), icon (image)} | `mxd-stats-simple` |
| `partnersSection` | `heading`, `partners[]` → ref partner *(empty → all)* | partner logo marquee (old "Partners Who Trust Us") |
| `testimonialsSection` | `heading`, `testimonials[]` → ref | Rayo `Testimonials` |
| `latestPostsSection` | `heading`, `description`, `cta`, `posts[]` → ref *(empty → latest 3)* | `Blogs` |
| `faqSection` | `heading`, `faqs[]` → ref faq | Rayo `Faqs` |
| `ctaSection` | `caption`, `cta` (`link`), `images[]` (image ×2) | `Cta` |
| `richTextSection` | `heading`, `body` (portableText) | generic (replaces `section_title` + `section_content`) |
| `formSection` | `form` (list: contact / bookCall / payment), `heading`, `intro` | contact + book-a-call + make-a-payment pages |
| `creditsSection` | `items[]` {name, url} | `credits_list` (only if the page still exists) |

### 2.4 Shared objects
- `link` — `{label, kind: internal/external/anchor, internal → ref page|caseStudy|service|post, external (url), anchor (string), newTab (bool)}`
- `seo` — `{metaTitle, metaDescription, ogImage, keywords[], noIndex}` (replaces `pageSeo`)
- `portableText` — current `blockContent` minus `urlEmbed`/`youtube` custom previews rewritten in TS; add `code` block; `internalLink` annotation switches from `internal_slug: string` to a reference.
- `imageWithAlt` — image + required `alt` (replaces `customImage`; drop the `class` field).

### 2.5 Removed
`hero`, `image_plug`, `imageComponent` (WebGL flags are presentation, not content), `section_scrolling_separator`, `section_title`, `section_content`, `section_contact`, `section_projects`, `services`, `services_single`, `portfolio`, `portfolio_item`, `partners_logo`, `credits_list`/`credit_item`, `menuPages`, `menuSubPages`, `menuSubPagesExternal`, `main_menu`, `pageSeo`, `customImage`, `schemas/schema.js` (dead v2 file), `crew.js`/`crew_single.js` (never registered).

---

## 3. Content migration (old → new)

Run as `sanity migration` scripts in `apps/studio/migrations/` against a **copy** of the dataset first (`sanity dataset export zeraus` → `sanity dataset import … staging`; point both apps at `staging` via `NEXT_PUBLIC_SANITY_DATASET` / `SANITY_STUDIO_DATASET`).

| step | from | to | rule |
|---|---|---|---|
| 1 | `siteSettings` | `siteSettings` | rename fields (`site_url→siteUrl`, `main_contact_email→contactEmail`, `social_links→socialLinks`, `description/keywords/author/seo_image → seo.*`); keep `_id` |
| 2 | `main_menu.items[]` (if a doc exists) else hard-coded v2 menu | `navigation.mainMenu[]` | `page_title→label`, `slug→link.internal` (resolve to page/caseStudy by slug; `our-work`, `book-a-call`), `image→image` |
| 3 | `homePage.services[]` | `service` docs | one doc per item; `title`, `body`, `image→illustration`; slug from title; `order` by array index; `featured: true` |
| 4 | `portfolio.portfolio_item[]` ∪ `homePage.projects[]` | `caseStudy` docs | dedupe by `title`; `mainImage→previewImage`, `clientLogo`, `keywords→tags`, `url`, `subtitle→tagline`; items that were in `homePage.projects` get `featured: true` |
| 5 | `homePage.partners_marquee[]` | `partner` docs | `title→name`, `clientLogo→logo`, `url` |
| 6 | `homePage.{hero_title, hero_content}` | `homePage.sections[0] heroSection` | `hero_title→wordmark` (likely "ZERAus"), `hero_content→caption`; media left for editor |
| 7 | `homePage.about_block` | `aboutSection` | `title→heading`, `body` (PT) → `paragraph` plain text (first block) + keep full `body` in a `richTextSection` if longer |
| 8 | `homePage.contact_section` | `ctaSection` | `title→caption`, `subtitle` dropped (CTA label from settings) |
| 9 | `page` (`our-work`, `book-a-call`) | `page` | `pageTitle→title`; `content[]` → `richTextSection`/`creditsSection`; `our-work` gets a `caseStudiesSection` with no refs (= all); `book-a-call` gets `formSection{form: bookCall}` |
| 10 | `post` | `post` | `mainImage→coverImage`; add empty `excerpt` |
| 10b | `homePage.seo`, `page[].seo` (`pageSeo`) | `seo` object | `description→metaDescription`, `keywords→keywords`, `seo_image→ogImage`, drop `author`; set `_type: 'seo'` (until this runs the Studio flags the old value as a type mismatch on that one field) |
| 11 | — | `techStack` seed | seed from the 9 Rayo cards re-pointed to our stack: Next.js, React, TypeScript, Sanity, Node, Vercel, Shopify, Supabase/Postgres, iOS/Android |
| 12 | — | `homePage.sections[]` | assemble in Rayo order (§1) using refs created in 3–5 |

Validation after each run: `pnpm --filter @zeraus/studio exec sanity documents validate` and a GROQ spot-check per type; the old documents are **not deleted** until the site is live on the new schema.

---

## 4. Studio structure (`apps/studio/structure.ts`)

```
Website
  ├─ Site Settings      (singleton)
  ├─ Navigation         (singleton)
  ├─ Home Page          (singleton, with Presentation preview)
  ├─ Pages
  ├─ Services
  ├─ Case Studies
  ├─ Partners
  ├─ Tech Stack
  ├─ Testimonials
  ├─ Team
  ├─ Insights  ─ Posts / Categories
  └─ FAQs
Leads
  ├─ Book-a-Call Leads  (bookCallForm)   ← unchanged
  └─ Contact Form       (contactForm)    ← unchanged
Business
  ├─ Clients / Invoices / Expenses       ← unchanged (keep views, orderings)
  └─ Client Projects (project), Persons  ← unchanged
```

Also:
- Add `presentationTool` with `previewUrl: NEXT_PUBLIC_SITE_URL + /api/draft-mode/enable` and document locations for `page`, `caseStudy`, `service`, `post`.
- Keep the role gate (`administrator` / `developer`), but give **non-admins the `Website` + `Leads` groups** instead of an empty desk.
- Register the singleton types with `__experimental_actions`/`actions` limited to update+publish and exclude them from "create new".

---

## 5. Frontend wiring (`apps/web`) — per section, in this order

1. `sanity/queries.ts` with `defineQuery` for `settingsQuery`, `navigationQuery`, `homePageQuery` (sections with refs expanded), `pageBySlugQuery`, `caseStudiesQuery`, `caseStudyBySlugQuery`, `servicesQuery`, `postsQuery`.
2. `components/sections/SectionRenderer.tsx` — `switch (section._type)` mapping to the Rayo components, each refactored to take props instead of importing JSON. Images via `urlFor()`, videos via `asset->url`.
3. `app/page.tsx` → `sanityFetch({query: homePageQuery})` → `SectionRenderer`.
4. `app/[slug]/page.tsx` (generic pages), `app/our-work/page.tsx` + `app/our-work/[slug]/page.tsx`, `app/services/page.tsx`, `app/insights/*`.
5. API routes `app/api/forms/contact|book-call/route.ts` writing `contactForm`/`bookCallForm` with `SANITY_WRITE_TOKEN` (server-only; replaces the hard-coded token in the v2 `pages/api/*`), zod-validated; `app/api/payments/*` ported from v2 with Braintree keys moved to env (`BRAINTREE_MERCHANT_ID|PUBLIC_KEY|PRIVATE_KEY|ENV`).
6. `app/api/draft-mode/enable/route.ts` + `<VisualEditing />` for Presentation.
7. Remove the Rayo demo routes (`(homes)/*`, `preview`, `(blogs)`, `(portfolios)`, `(other-pages)` that we don't keep) and their `data/*.json` once each is CMS-driven.

---

## 6. Do-not-touch list (plugin/function dependencies)

- **Invoices tool** (`plugins/invoices`): `invoices{_id,_rev,invoice_number,invoice_date,invoice_due_date,payment_status(unpaid|partially|paid),clients->,invoiceItems[]{description,quantity,price},tax,email_request{to,pdf_base64,filename,requested_at},email_sent{to,sent_at}}`, `clients{client_name,client_contact,client_phone,client_email,client_address_1,client_address_2,client_city,client_state,client_zip}`.
- **Expenses tool**: `expenses{date,title,description,amount,category[]->name}`, `expense_category{name}`.
- **Form Submissions widget**: `contactForm{contactFormData{name,email,message}}` — ⚠️ the widget hard-codes a Sanity token in `plugins/form-submissions/index.jsx`; replace with the Studio's authenticated client (`useClient`) and **rotate that token**.
- **`send-invoice-email` function** (`sanity.blueprint.ts`): filter `_type == "invoices" && defined(email_request)`.
- **v2 site API routes** hard-code a Sanity write token and Braintree production keys — rotate both when the new routes ship.

---

## 7. Phases

| phase | scope | done when |
|---|---|---|
| **0 ✅** | Monorepo, Rayo port, brand tokens, shared Sanity config, typegen config | `pnpm build` green |
| **1 ✅** | New schemas in `schemas/web/` (TS), structure regroup, old types hidden; typegen | Studio boots, `sanity schema extract` passes — done 2026-10-21, see §8 |
| **2 🔜** | Migration scripts on a `staging` dataset; home + our-work + services wired to Sanity | Home renders 100% from CMS on staging |
| **3 🧭** | Forms + payments API routes, Presentation/visual editing, remaining pages, insights | Feature parity with zera.us v2 + new pages |
| **4 🧭** | Run migration on `zeraus`, flip DNS/Vercel, delete old types + demo routes, rotate tokens | v3 live |

---

## 8. Phase 1 — as built (2026-10-21)

Everything lives in `apps/studio/schemas/web/`:

```
web/
├─ shared/     imageWithAlt, link, seo, socialLink, navItem, youtube, urlEmbed, codeBlock,
│              portableText + simplePortableText, sectionFields (anchor/theme fieldset)
├─ sections/   the 17 page-builder objects from §2.3 + pageBuilder (the `sections[]` array)
├─ documents/  siteSettings, navigation, homePage, page, service, caseStudy, partner,
│              techStack, testimonial, teamMember, post, category, faq
└─ legacy.ts   legacyField() helper, SINGLETON_TYPES, LEGACY_WEB_TYPES
```

Deviations from §2 worth knowing when writing queries / the migration:

| plan | built | why |
|---|---|---|
| `aboutSection.paragraph` (text) | `aboutSection.body` (`simplePortableText`) | rule 0.6 |
| `caseStudiesSection.description`, `latestPostsSection.description`, `faqSection.intro`, `formSection.intro` (text) | `simplePortableText` | rule 0.6 |
| `service.excerpt`, `post.excerpt`, `testimonial.quote`, `category.description` (text) | `simplePortableText` | rule 0.6 |
| `servicesSection.services[]` + `layout[]` | `servicesSection.cards[]{service→, size: normal/wide, theme: tint/accent/additional/opposite}` (`serviceCard`) | one array instead of two parallel ones |
| `heroSection.media[]{kind,file/image,animation}` | `heroMedia{kind, image, video, poster, animation}` | explicit poster for video items |
| `heroSection` = Rayo hero 03 only | `heroSection.variant` selects any of the **nine Rayo heroes** (software, agency, pinned, studio, webAgency, freelancer, creativeDeveloper, designer, personal); fields show/hide per layout; `/hero-gallery` (noindex) renders all nine with the home hero's content for comparison | the client wanted to choose |
| `serviceCard{service,size,theme}` | + `imagePosition`, `imageAnimation` (defaults follow Rayo's five cards) | match the template's bento |
| `ctaSection` | + `backgroundImage` (the right-hand panel background) | was a CSS placeholder |
| `statsSection.stats[]{…}` | `stat` object (named, so typegen exports it) | — |
| `sectionBase.anchor` (slug) | `anchor` (string, `^[a-z0-9-]+$`) | no slug source needed; simpler in the frontend |
| `caseStudy` | + `excerpt`, `industries[]` (Rayo project-details shows Industries) | — |
| `siteSettings` | + `copyright`, `newsletter.successMessage/errorMessage` | footer copy |
| `formSection` | + `successMessage` | — |
| `faq` | + `order` | — |
| `post.author` → `teamMember` | as planned; old `mainImage` kept as legacy field | — |
| `code` block | `codeBlock{language, filename, code}` (plain object, no `@sanity/code-input`) | no extra dependency; swap later if wanted |

Transition mechanics:

- Reshaped documents (`homePage`, `page`, `siteSettings`, `post`) keep their v2 fields under a **Legacy (v2)** group: read-only, `deprecated`, hidden when empty. They disappear in phase 4 together with `LEGACY_WEB_TYPES`.
- All other v2 website types are still registered (title suffixed "(legacy)", `deprecated`) and hidden from *Create new*; `schemas/index.ts` throws on duplicate type names.
- Singletons (`siteSettings`, `navigation`, `homePage`) have fixed `_id`s via the structure and only publish/discard/restore actions.
- Structure: **Website** / **Leads** / **Business** groups (§4). Non-admins now get Website + Leads (previously an empty desk). The role check also fixed the `tools` filter, which still referenced the v2 `desk` tool name.
- Presentation tool is wired (`src/lib/presentation.ts` locations for homePage/page/caseStudy/service/post) but only mounts when `SANITY_STUDIO_PREVIEW_URL` is set, because the draft-mode route is phase 3.
- The `sections[]` insert menu is a **tile grid** with a thumbnail per block (`apps/studio/static/block-previews/<type>.png`, served at `/static/…`). Thumbnails are real screenshots of the Rayo sections, regenerated with `pnpm --filter @zeraus/web block-previews` while `pnpm dev:web` is running (`apps/web/scripts/block-previews.mjs`, uses local Chrome via `playwright-core`). `creditsSection` has no Rayo block and gets a rendered placeholder.
- `pnpm typegen` → `apps/web/sanity/types.generated.ts` (118 types, incl. `PageBuilder`, every `*Section`, `SimplePortableText`). Typegen now only scans `apps/web/{app,components,sanity,lib}`.
- Not done on purpose: no documents created, nothing deployed, dataset untouched. Phase 2 starts by exporting `zeraus` → `staging`.
