import { defineArrayMember, defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const partnersSection = defineType({
  name: 'partnersSection',
  title: 'Partners / clients logos',
  type: 'object',
  icon: StarIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      description: 'Leave empty to show all partners in their order.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'partner' }] })],
      validation: (rule) => rule.unique(),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', items: 'partners' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'Partners', subtitle: count ? `Partners · ${count}` : 'Partners · all' }
    },
  },
})
