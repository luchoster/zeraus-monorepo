import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

/**
 * Document → URL mapping for the Presentation tool ("Used on" banner + preview).
 * Routes follow docs/SCHEMA_PLAN.md §1 / §5.
 */
export const locations: PresentationPluginOptions['resolve'] extends infer R
  ? R extends { locations?: infer L }
    ? L
    : never
  : never = {
  homePage: defineLocations({
    locations: [{ title: 'Home', href: '/' }],
  }),
  siteSettings: defineLocations({
    message: 'Used on every page',
    tone: 'caution',
  }),
  navigation: defineLocations({
    message: 'Used in the header and footer of every page',
    tone: 'caution',
  }),
  page: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [{ title: doc?.title || 'Untitled', href: `/${doc?.slug ?? ''}` }],
    }),
  }),
  caseStudy: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title || 'Untitled', href: `/our-work/${doc?.slug ?? ''}` },
        { title: 'Our work', href: '/our-work' },
      ],
    }),
  }),
  service: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title || 'Untitled', href: `/services/${doc?.slug ?? ''}` },
        { title: 'Services', href: '/services' },
      ],
    }),
  }),
  post: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title || 'Untitled', href: `/insights/${doc?.slug ?? ''}` },
        { title: 'Insights', href: '/insights' },
      ],
    }),
  }),
}
