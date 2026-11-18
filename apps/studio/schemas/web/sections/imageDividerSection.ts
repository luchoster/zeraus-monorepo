import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const imageDividerSection = defineType({
  name: 'imageDividerSection',
  title: 'Image divider (parallax)',
  type: 'object',
  icon: ImageIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      description: 'Wide image, at least 1920px.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parallaxScale',
      title: 'Parallax scale',
      type: 'number',
      description: 'How much the image is enlarged while scrolling (1 = none).',
      initialValue: 1.5,
      validation: (rule) => rule.min(1).max(2),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { media: 'image', alt: 'image.alt' },
    prepare({ media, alt }) {
      return { title: alt || 'Image divider', subtitle: 'Image divider', media }
    },
  },
})
