import { defineArrayMember, defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials',
  type: 'object',
  icon: CommentIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description: 'Leave empty to show all testimonials, newest first.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
      validation: (rule) => rule.unique(),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', items: 'testimonials' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'Testimonials', subtitle: count ? `Testimonials · ${count}` : 'Testimonials · all' }
    },
  },
})
