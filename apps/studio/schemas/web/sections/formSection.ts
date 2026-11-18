import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const FORM_KINDS = [
  { title: 'Contact form', value: 'contact' },
  { title: 'Book a call', value: 'bookCall' },
  { title: 'Make a payment', value: 'payment' },
]

export const formSection = defineType({
  name: 'formSection',
  title: 'Form',
  type: 'object',
  icon: EnvelopeIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({
      name: 'form',
      title: 'Form',
      type: 'string',
      options: { list: FORM_KINDS, layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'simplePortableText' }),
    defineField({
      name: 'successMessage',
      title: 'Success message',
      type: 'simplePortableText',
      description: 'Shown after a successful submission.',
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', form: 'form' },
    prepare({ title, form }) {
      const kind = FORM_KINDS.find((f) => f.value === form)?.title
      return { title: title || kind || 'Form', subtitle: `Form · ${kind ?? ''}` }
    },
  },
})
