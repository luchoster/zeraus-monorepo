import { defineArrayMember, defineField, defineType } from 'sanity'
import { LinkIcon, EarthGlobeIcon, DocumentIcon } from '@sanity/icons'
import { LINKABLE_TYPES } from './link'

/** Annotations shared by both rich-text flavours. */
const annotations = [
  defineArrayMember({
    name: 'link',
    title: 'External link',
    type: 'object',
    icon: EarthGlobeIcon,
    fields: [
      defineField({
        name: 'href',
        title: 'URL',
        type: 'url',
        validation: (rule) => rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
      }),
      defineField({ name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: true }),
    ],
  }),
  defineArrayMember({
    name: 'internalLink',
    title: 'Internal link',
    type: 'object',
    icon: LinkIcon,
    fields: [
      defineField({
        name: 'reference',
        title: 'Page',
        type: 'reference',
        to: LINKABLE_TYPES.map((type) => ({ type })),
        validation: (rule) => rule.required(),
      }),
    ],
  }),
]

/**
 * Full rich text: headings, lists, images, embeds, code, files.
 * Use for bodies (posts, services, case studies, rich-text sections).
 */
export const portableText = defineType({
  name: 'portableText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations,
      },
    }),
    defineArrayMember({ type: 'imageWithAlt' }),
    defineArrayMember({ type: 'youtube' }),
    defineArrayMember({ type: 'urlEmbed' }),
    defineArrayMember({ type: 'codeBlock' }),
    defineArrayMember({ type: 'file', title: 'File download', icon: DocumentIcon }),
  ],
})

/**
 * Inline-only rich text: paragraphs with bold/italic/links, no headings or media.
 * Use for excerpts, intros, quotes and section descriptions — anything that is
 * more than a heading but should not turn into a full article.
 */
export const simplePortableText = defineType({
  name: 'simplePortableText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations,
      },
    }),
  ],
})
