import { defineArrayMember, defineType } from 'sanity'

/**
 * The page builder: `sections[]` on `homePage` and `page`.
 * Order here = order in the Studio insert menu.
 */
export const SECTION_TYPES = [
  'heroSection',
  'marqueeSection',
  'servicesSection',
  'aboutSection',
  'imageDividerSection',
  'capabilitiesSection',
  'caseStudiesSection',
  'techStackSection',
  'statsSection',
  'partnersSection',
  'testimonialsSection',
  'latestPostsSection',
  'faqSection',
  'ctaSection',
  'richTextSection',
  'formSection',
  'creditsSection',
] as const

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Sections',
  type: 'array',
  of: SECTION_TYPES.map((type) => defineArrayMember({ type })),
  options: {
    insertMenu: {
      filter: true,
      // Tiles with a thumbnail per block. Images live in apps/studio/static/block-previews/
      // (served at /static/…) and are regenerated with `pnpm block-previews` in apps/web.
      views: [
        { name: 'grid', previewImageUrl: (schemaTypeName) => `/static/block-previews/${schemaTypeName}.png` },
        { name: 'list' },
      ],
    },
  },
})
