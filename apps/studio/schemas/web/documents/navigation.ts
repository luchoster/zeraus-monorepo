import { defineArrayMember, defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'mainMenu',
      title: 'Main menu',
      type: 'array',
      description: 'The full-screen menu (header).',
      of: [defineArrayMember({ type: 'navItem' })],
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'footerMenu',
      title: 'Footer menu',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
      validation: (rule) => rule.max(12),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigation' }
    },
  },
})
