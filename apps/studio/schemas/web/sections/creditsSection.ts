import { defineArrayMember, defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const creditsSection = defineType({
  name: 'creditsSection',
  title: 'Credits',
  type: 'object',
  icon: HeartIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Credits',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'credit',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.uri({ scheme: ['http', 'https'] }) }),
          ],
          preview: { select: { title: 'name', subtitle: 'url' } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'Credits', subtitle: `Credits · ${count}` }
    },
  },
})
