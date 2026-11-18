import { defineQuery } from "next-sanity";

/* ── Fragments ─────────────────────────────────────────────────────── */

const IMAGE = /* groq */ `{
  ...,
  asset->{ _id, url, metadata{ lqip, dimensions{ width, height, aspectRatio } } }
}`;

const LINK = /* groq */ `{
  label, kind, external, anchor, newTab,
  internal->{ _type, "slug": slug.current }
}`;

const SERVICE_CARD = /* groq */ `{
  _id, title, shortTitle, excerpt, tags, "slug": slug.current,
  illustration ${IMAGE}, cardImage ${IMAGE}, hoverImage ${IMAGE}
}`;

const CASE_STUDY_CARD = /* groq */ `{
  _id, title, tagline, tags, url, "slug": slug.current, previewImage ${IMAGE}
}`;

const TECH = /* groq */ `{ _id, name, url, category, logo ${IMAGE} }`;

const PARTNER = /* groq */ `{ _id, name, url, logo ${IMAGE}, logoLight ${IMAGE} }`;

const TESTIMONIAL = /* groq */ `{
  _id, quote, author, role, company, companyUrl, rating,
  avatar ${IMAGE}, companyLogo ${IMAGE}, image ${IMAGE},
  caseStudy->{ title, "slug": slug.current }
}`;

const POST_CARD = /* groq */ `{
  _id, title, publishedAt, "slug": slug.current, coverImage ${IMAGE},
  "categories": categories[]->title
}`;

/* ── Page builder ──────────────────────────────────────────────────── */

const SECTIONS = /* groq */ `sections[]{
  _key, _type, anchor, theme,
  _type == "heroSection" => {
    variant, caption, wordmark, title, tagline, description, marqueeItems, valuesLeft, valuesRight,
    availabilityMark, cta ${LINK}, videoModalUrl, trustText,
    media[]{ _key, kind, animation, image ${IMAGE}, "video": video.asset->url, "poster": poster.asset->url },
    dividerVideo{ "video": video.asset->url, "poster": poster.asset->url },
    stats[]{ _key, value, suffix, label },
    trustAvatars[] ${IMAGE},
    "caseStudies": select(
      variant == "pinned" => *[_type == "caseStudy" && featured == true] | order(order asc, _createdAt desc)[0...7]{
        _id, title, "slug": slug.current, previewImage ${IMAGE}
      },
      null
    )
  },
  _type == "innerHeroSection" => {
    variant, eyebrow, title, text, titleDecoration, typedLines, mailtoLabel, mailtoEmail,
    tags, breadcrumbs[]{ _key, label, href },
    showDivider, dividerImage ${IMAGE},
    rotatingCtaText, rotatingCtaLink ${LINK}, rotatingCtaImage ${IMAGE},
    valuesLeft, valuesRight, imageLeft ${IMAGE}, imageRight ${IMAGE}, description,
    projectLinkLabel, projectUrl, client, servicesLabel, industries, date, paddingClass
  },
  _type == "marqueeSection" => { items, direction, muted },
  _type == "servicesSection" => {
    heading,
    cards[]{ _key, size, theme, imagePosition, imageAnimation, service->${SERVICE_CARD} }
  },
  _type == "aboutSection" => { heading, body, valuesLeft, valuesRight, cta ${LINK} },
  _type == "imageDividerSection" => { image ${IMAGE}, parallaxScale },
  _type == "capabilitiesSection" => { heading, cta ${LINK}, services[]->${SERVICE_CARD} },
  _type == "caseStudiesSection" => {
    heading, description, cta ${LINK},
    "caseStudies": select(
      count(caseStudies) > 0 => caseStudies[]->${CASE_STUDY_CARD},
      *[_type == "caseStudy" && featured == true] | order(order asc, _createdAt desc)[0...6]${CASE_STUDY_CARD}
    )
  },
  _type == "techStackSection" => {
    heading,
    "items": select(
      count(items) > 0 => items[]->${TECH},
      *[_type == "techStack"] | order(order asc, name asc)${TECH}
    )
  },
  _type == "statsSection" => { stats[]{ _key, value, suffix, label, icon ${IMAGE} } },
  _type == "partnersSection" => {
    heading,
    "partners": select(
      count(partners) > 0 => partners[]->${PARTNER},
      *[_type == "partner"] | order(order asc, name asc)${PARTNER}
    )
  },
  _type == "testimonialsSection" => {
    heading,
    "testimonials": select(
      count(testimonials) > 0 => testimonials[]->${TESTIMONIAL},
      *[_type == "testimonial"] | order(_createdAt desc)${TESTIMONIAL}
    )
  },
  _type == "latestPostsSection" => {
    heading, description, cta ${LINK},
    "posts": select(
      count(posts) > 0 => posts[]->${POST_CARD},
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]${POST_CARD}
    )
  },
  _type == "faqSection" => { heading, intro, faqs[]->{ _id, question, answer } },
  _type == "ctaSection" => { caption, cta ${LINK}, icon ${IMAGE}, backgroundImage ${IMAGE}, images[] ${IMAGE} },
  _type == "richTextSection" => { heading, body },
  _type == "formSection" => { form, heading, intro, successMessage },
  _type == "creditsSection" => { heading, items[]{ _key, name, url } }
}`;

const SEO = /* groq */ `seo{ metaTitle, metaDescription, keywords, noIndex, ogImage ${IMAGE} }`;

/* ── Queries ───────────────────────────────────────────────────────── */

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `*[_id == "siteSettings"][0]{
  title, tagline, siteUrl, wordmark, contactEmail, phone, address, defaultColorScheme, copyright,
  logo ${IMAGE}, logoLight ${IMAGE},
  socialLinks[]{ _key, platform, label, url },
  headerCta ${LINK},
  menuPromo{ caption, "video": video.asset->url, "poster": poster.asset->url },
  footerNavGroups[]{ _key, title, links[] ${LINK} },
  legalLinks[] ${LINK},
  ${SEO},
  analytics{ gaId }
}`);

export const NAVIGATION_QUERY = defineQuery(/* groq */ `*[_id == "navigation"][0]{
  mainMenu[]{ _key, link ${LINK}, image ${IMAGE}, children[]{ _key, link ${LINK} } },
  footerMenu[]{ _key, link ${LINK} }
}`);

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `*[_id == "homePage"][0]{
  _id, _type, title, ${SEO},
  ${SECTIONS},
  "settings": *[_id == "siteSettings"][0]{ wordmark, title, headerCta ${LINK}, socialLinks[]{ _key, platform, label, url } }
}`);

export const PAGE_BY_SLUG_QUERY = defineQuery(/* groq */ `*[_type == "page" && slug.current == $slug][0]{
  _id, _type, title, "slug": slug.current, ${SEO},
  ${SECTIONS},
  "settings": *[_id == "siteSettings"][0]{ wordmark, title, headerCta ${LINK}, socialLinks[]{ _key, platform, label, url } }
}`);

export const PAGE_SLUGS_QUERY = defineQuery(/* groq */ `*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`);

/** Dev gallery: the home hero plus featured case studies, to preview every hero layout. */
export const HERO_GALLERY_QUERY = defineQuery(/* groq */ `{
  "hero": *[_id == "homePage"][0].sections[_type == "heroSection"][0]{
    _key, _type, anchor, theme, variant, caption, wordmark, title, tagline, description, marqueeItems, valuesLeft, valuesRight,
    availabilityMark, cta ${LINK}, videoModalUrl, trustText,
    media[]{ _key, kind, animation, image ${IMAGE}, "video": video.asset->url, "poster": poster.asset->url },
    dividerVideo{ "video": video.asset->url, "poster": poster.asset->url },
    stats[]{ _key, value, suffix, label },
    trustAvatars[] ${IMAGE},
    "caseStudies": *[_type == "caseStudy" && featured == true] | order(order asc, _createdAt desc)[0...7]{
      _id, title, "slug": slug.current, previewImage ${IMAGE}
    }
  },
  "settings": *[_id == "siteSettings"][0]{ wordmark, title, headerCta ${LINK}, socialLinks[]{ _key, platform, label, url } }
}`);

export const SERVICE_BY_SLUG_QUERY = defineQuery(/* groq */ `*[_type == "service" && slug.current == $slug][0]{
  _id, _type, title, shortTitle, excerpt, body, tags, "slug": slug.current,
  illustration ${IMAGE}, cardImage ${IMAGE}, hoverImage ${IMAGE}, icon ${IMAGE},
  ${SEO}
}`);

export const SERVICE_SLUGS_QUERY = defineQuery(/* groq */ `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`);

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(/* groq */ `*[_type == "caseStudy" && slug.current == $slug][0]{
  _id, _type, title, tagline, excerpt, challenge, solution, results,
  client, year, url, tags, industries, "slug": slug.current,
  previewImage ${IMAGE}, heroImage ${IMAGE}, gallery[] ${IMAGE},
  clientLogo ${IMAGE},
  services[]->{ _id, title, shortTitle, "slug": slug.current },
  testimonial->{ _id, quote, author, role, company, avatar ${IMAGE} },
  ${SEO}
}`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(/* groq */ `*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`);
