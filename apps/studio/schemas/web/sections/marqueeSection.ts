import { defineArrayMember, defineField, defineType } from 'sanity'
import { ArrowRightIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const marqueeSection = defineType({
  name: 'marqueeSection',
  title: 'Marquee',
  type: 'object',
  icon: ArrowRightIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      description: 'Words or short phrases, separated by the brand star. One item repeats as a sentence.',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Right', value: 'right' },
          { title: 'Left', value: 'left' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'muted',
      title: 'Muted text',
      type: 'boolean',
      description: 'Render in the muted text colour instead of the bright one.',
      initialValue: true,
    }),
    ...sectionFields,
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      return { title: (items as string[] | undefined)?.join(' · ') || 'Marquee', subtitle: 'Marquee' }
    },
  },
})
