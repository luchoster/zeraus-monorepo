import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO.',
      validation: (rule) => rule.required().error('Alternative text is required.'),
    }),
  ],
  preview: {
    select: { media: 'asset', title: 'alt' },
    prepare({ media, title }) {
      return { title: title || 'Image', media }
    },
  },
})
