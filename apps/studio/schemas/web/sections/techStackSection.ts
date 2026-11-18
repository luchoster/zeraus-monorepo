import { defineArrayMember, defineField, defineType } from 'sanity'
import { CodeIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const techStackSection = defineType({
  name: 'techStackSection',
  title: 'Tech stack',
  type: 'object',
  icon: CodeIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'items',
      title: 'Technologies',
      type: 'array',
      description: 'Leave empty to show all technologies in their order.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'techStack' }] })],
      validation: (rule) => rule.max(12).unique(),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'Tech stack', subtitle: count ? `Tech stack · ${count}` : 'Tech stack · all' }
    },
  },
})
