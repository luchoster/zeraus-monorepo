import { defineArrayMember, defineField, defineType } from 'sanity'
import { WrenchIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
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
      name: 'shortTitle',
      title: 'Short title',
      type: 'string',
      group: 'content',
      description: 'Used on cards when the full title is too long (e.g. "Integrations").',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText',
      group: 'content',
      description: 'One or two sentences shown on cards and lists.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableText', group: 'content' }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (rule) => rule.max(6).unique(),
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'content', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number', group: 'content', description: 'Lower numbers come first.' }),
    defineField({
      name: 'illustration',
      title: 'Illustration',
      type: 'imageWithAlt',
      group: 'media',
      description: 'Shown on the bento card (square-ish, ~1200px).',
    }),
    defineField({
      name: 'cardImage',
      title: 'Capabilities image',
      type: 'imageWithAlt',
      group: 'media',
      description: 'Wide image in the capabilities list (1200×800).',
    }),
    defineField({
      name: 'hoverImage',
      title: 'Capabilities hover image',
      type: 'imageWithAlt',
      group: 'media',
      description: 'Portrait image revealed on hover (600×730).',
    }),
    defineField({ name: 'icon', title: 'Icon', type: 'image', group: 'media', description: 'SVG preferred.' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    { title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortTitle', media: 'illustration', featured: 'featured' },
    prepare({ title, subtitle, media, featured }) {
      return { title: `${featured ? '★ ' : ''}${title ?? 'Untitled service'}`, subtitle, media }
    },
  },
})
