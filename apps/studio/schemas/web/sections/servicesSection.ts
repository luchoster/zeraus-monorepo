import { defineArrayMember, defineField, defineType } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

/** One bento card in Rayo `mxd-services-cards-s`. */
export const serviceCard = defineType({
  name: 'serviceCard',
  title: 'Service card',
  type: 'object',
  fields: [
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Card size',
      type: 'string',
      options: {
        list: [
          { title: 'Normal (1/3)', value: 'normal' },
          { title: 'Wide (2/3)', value: 'wide' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'theme',
      title: 'Card colour',
      type: 'string',
      options: {
        list: [
          { title: 'Tint', value: 'tint' },
          { title: 'Accent', value: 'accent' },
          { title: 'Additional', value: 'additional' },
          { title: 'Opposite', value: 'opposite' },
        ],
      },
      initialValue: 'tint',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Illustration position',
      type: 'string',
      description: 'Where the service illustration sits on the card. Default follows the template: wide card → right, then top-right, bottom, low bottom, top.',
      options: {
        list: [
          { title: 'Right (wide cards)', value: 'right' },
          { title: 'Top right', value: 'top-right' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Bottom, lower', value: 'bottom-low' },
          { title: 'Top', value: 'top' },
        ],
      },
    }),
    defineField({
      name: 'imageAnimation',
      title: 'Illustration animation',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Float', value: 'move' },
          { title: 'Slow rotate', value: 'rotate-slow' },
          { title: 'Pulse', value: 'pulse-small' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    }),
  ],
  preview: {
    select: { title: 'service.title', media: 'service.illustration', size: 'size', theme: 'theme' },
    prepare({ title, media, size, theme }) {
      return { title: title || 'Service', subtitle: [size, theme].filter(Boolean).join(' · '), media }
    },
  },
})

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services (bento cards)',
  type: 'object',
  icon: ThLargeIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional — the home page bento has none.',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceCard' })],
      validation: (rule) => rule.required().min(1).max(5),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { heading: 'heading', cards: 'cards' },
    prepare({ heading, cards }) {
      const count = Array.isArray(cards) ? cards.length : 0
      return { title: heading || 'Services', subtitle: `Services · ${count} card${count === 1 ? '' : 's'}` }
    },
  },
})
