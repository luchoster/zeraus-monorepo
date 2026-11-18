import { defineField, defineType } from 'sanity'
import { CodeIcon } from '@sanity/icons'

export const TECH_CATEGORIES = [
  { title: 'Frontend', value: 'frontend' },
  { title: 'Backend', value: 'backend' },
  { title: 'CMS & content', value: 'cms' },
  { title: 'Infrastructure', value: 'infra' },
  { title: 'Design', value: 'design' },
  { title: 'AI', value: 'ai' },
  { title: 'Mobile', value: 'mobile' },
  { title: 'Commerce', value: 'commerce' },
]

export const techStack = defineType({
  name: 'techStack',
  title: 'Technology',
  type: 'document',
  icon: CodeIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Monochrome SVG — it is recoloured with the current text colour.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'url', title: 'Website', type: 'url', validation: (rule) => rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: TECH_CATEGORIES } }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', category: 'category', media: 'logo' },
    prepare({ title, category, media }) {
      return { title, subtitle: TECH_CATEGORIES.find((c) => c.value === category)?.title, media }
    },
  },
})
