import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'SVG preferred. Shown on the dark scheme.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'logoLight', title: 'Logo (light scheme)', type: 'image' }),
    defineField({ name: 'url', title: 'Website', type: 'url', validation: (rule) => rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'url', media: 'logo' } },
})
