import { defineArrayMember, defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const footerNavGroup = defineType({
  name: 'footerNavGroup',
  title: 'Footer nav group',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Group title',
      type: 'string',
      description: 'Optional. Leave blank for a simple link list.',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', links: 'links' },
    prepare({ title, links }) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title: title || 'Links',
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
