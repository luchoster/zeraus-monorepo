import { defineArrayMember, defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Project details' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'content',
      description: 'A few words completing the title, e.g. "for a cross-platform solution".',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText',
      group: 'content',
      description: 'Short summary for lists and link previews.',
    }),
    defineField({ name: 'challenge', title: 'Challenge', type: 'portableText', group: 'content' }),
    defineField({ name: 'solution', title: 'Solution', type: 'portableText', group: 'content' }),
    defineField({ name: 'results', title: 'Results', type: 'portableText', group: 'content' }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      group: 'content',
    }),
    defineField({ name: 'featured', title: 'Featured on home', type: 'boolean', group: 'content', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number', group: 'content', description: 'Lower numbers come first.' }),

    defineField({ name: 'client', title: 'Client', type: 'string', group: 'details' }),
    defineField({ name: 'clientLogo', title: 'Client logo', type: 'image', group: 'details', description: 'SVG preferred.' }),
    defineField({
      name: 'url',
      title: 'Live URL',
      type: 'url',
      group: 'details',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'details',
      description: 'Shown on the preview card (e.g. "Next.js", "Shopify").',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (rule) => rule.max(5).unique(),
    }),

    defineField({
      name: 'previewImage',
      title: 'Preview image',
      type: 'imageWithAlt',
      group: 'media',
      description: 'Card image in lists and the pinned home section.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'imageWithAlt', group: 'media' }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    { title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Newest', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', client: 'client', year: 'year', media: 'previewImage', featured: 'featured' },
    prepare({ title, client, year, media, featured }) {
      return {
        title: `${featured ? '★ ' : ''}${title ?? 'Untitled case study'}`,
        subtitle: [client, year].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
