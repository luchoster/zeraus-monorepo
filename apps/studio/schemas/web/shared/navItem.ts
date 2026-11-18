import { defineArrayMember, defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const navItem = defineType({
  name: 'navItem',
  title: 'Menu item',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hover image',
      type: 'imageWithAlt',
      description: 'Optional image shown in the full-screen menu when this item is hovered.',
    }),
    defineField({
      name: 'children',
      title: 'Sub-menu',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
      validation: (rule) => rule.max(8),
    }),
  ],
  preview: {
    select: { title: 'link.label', kind: 'link.kind', external: 'link.external', internal: 'link.internal.title', media: 'image' },
    prepare({ title, kind, external, internal, media }) {
      return { title: title || 'Menu item', subtitle: kind === 'external' ? external : internal, media }
    },
  },
})
