import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const LINKABLE_TYPES = ['page', 'caseStudy', 'service', 'post'] as const

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Link type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal page', value: 'internal' },
          { title: 'External URL', value: 'external' },
          { title: 'Anchor on this page', value: 'anchor' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Page',
      type: 'reference',
      to: LINKABLE_TYPES.map((type) => ({ type })),
      hidden: ({ parent }) => parent?.kind !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { kind?: string } | undefined
          if (parent?.kind === 'internal' && !value) return 'Select a page'
          return true
        }),
    }),
    defineField({
      name: 'external',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.kind !== 'external',
      validation: (rule) =>
        rule
          .uri({ scheme: ['http', 'https', 'mailto', 'tel'] })
          .custom((value, context) => {
            const parent = context.parent as { kind?: string } | undefined
            if (parent?.kind === 'external' && !value) return 'Enter a URL'
            return true
          }),
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor ID',
      type: 'string',
      description: 'The "Anchor ID" of a section on the same page, without the #.',
      hidden: ({ parent }) => parent?.kind !== 'anchor',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { kind?: string } | undefined
          if (parent?.kind === 'anchor' && !value) return 'Enter an anchor ID'
          if (value && !/^[a-z0-9-]+$/.test(value)) return 'Lowercase letters, numbers and hyphens only'
          return true
        }),
    }),
    defineField({
      name: 'newTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      kind: 'kind',
      external: 'external',
      anchor: 'anchor',
      internalTitle: 'internal.title',
    },
    prepare({ label, kind, external, anchor, internalTitle }) {
      const target =
        kind === 'external' ? external : kind === 'anchor' ? `#${anchor ?? ''}` : internalTitle
      return { title: label || 'Link', subtitle: target || kind }
    },
  },
})
