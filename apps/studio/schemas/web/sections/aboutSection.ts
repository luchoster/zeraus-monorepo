import { defineArrayMember, defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About',
  type: 'object',
  icon: UsersIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'body',
      title: 'Paragraph',
      type: 'simplePortableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'valuesLeft',
      title: 'List (left column)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'valuesRight',
      title: 'List (right column)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({ name: 'cta', title: 'Button', type: 'link' }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'About', subtitle: 'About' }
    },
  },
})
