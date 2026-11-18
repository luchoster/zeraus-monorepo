import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const latestPostsSection = defineType({
  name: 'latestPostsSection',
  title: 'Latest posts',
  type: 'object',
  icon: DocumentTextIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'simplePortableText' }),
    defineField({ name: 'cta', title: 'Button', type: 'link' }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      description: 'Leave empty to show the 3 latest published posts.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'post' }] })],
      validation: (rule) => rule.max(3).unique(),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', items: 'posts' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'Latest posts', subtitle: count ? `Posts · ${count}` : 'Posts · latest 3' }
    },
  },
})
