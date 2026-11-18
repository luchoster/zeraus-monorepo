import { defineArrayMember, defineField, defineType } from 'sanity'
import { BoltIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Call to action',
  type: 'object',
  icon: BoltIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'caption', title: 'Caption', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'cta', title: 'Button', type: 'link', validation: (rule) => rule.required() }),
    defineField({ name: 'icon', title: 'Icon', type: 'image', description: 'Small object shown before the caption.' }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      description: 'Fills the right half of the panel behind the floating images (wide, ~1600px).',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Floating images',
      type: 'array',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      validation: (rule) => rule.max(2),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'caption', media: 'images.0' },
    prepare({ title, media }) {
      return { title: title || 'Call to action', subtitle: 'Call to action', media }
    },
  },
})
