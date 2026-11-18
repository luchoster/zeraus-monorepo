import { defineArrayMember, defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const caseStudiesSection = defineType({
  name: 'caseStudiesSection',
  title: 'Case studies (pinned)',
  type: 'object',
  icon: CaseIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'simplePortableText' }),
    defineField({ name: 'cta', title: 'Button', type: 'link' }),
    defineField({
      name: 'caseStudies',
      title: 'Case studies',
      type: 'array',
      description: 'Leave empty to show featured case studies in their order.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'caseStudy' }] })],
      validation: (rule) => rule.max(6).unique(),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', items: 'caseStudies' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'Case studies', subtitle: count ? `Case studies · ${count}` : 'Case studies · featured' }
    },
  },
})
