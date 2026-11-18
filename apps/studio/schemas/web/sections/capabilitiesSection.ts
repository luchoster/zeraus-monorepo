import { defineArrayMember, defineField, defineType } from 'sanity'
import { UlistIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const capabilitiesSection = defineType({
  name: 'capabilitiesSection',
  title: 'Capabilities list',
  type: 'object',
  icon: UlistIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'cta', title: 'Button', type: 'link' }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      description: 'Numbered in this order. Each service needs its card and hover images.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      validation: (rule) => rule.required().min(1).max(8).unique(),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', services: 'services' },
    prepare({ title, services }) {
      const count = Array.isArray(services) ? services.length : 0
      return { title: title || 'Capabilities', subtitle: `Capabilities · ${count}` }
    },
  },
})
