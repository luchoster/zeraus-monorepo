import { defineArrayMember, defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'intro', title: 'Intro', type: 'simplePortableText' }),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'faq' }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', items: 'faqs' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'FAQ', subtitle: `FAQ · ${count}` }
    },
  },
})
