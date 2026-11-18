import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { legacyField } from '../legacy'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'legacy', title: 'Legacy (v2)' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText',
      group: 'content',
      description: 'Shown in lists and used as the default meta description.',
    }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'imageWithAlt', group: 'content' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'teamMember' }], group: 'content' }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableText', group: 'content' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),

    legacyField(
      defineField({ name: 'mainImage', title: 'Main image (legacy)', type: 'image', options: { hotspot: true } }),
      'Replaced by "Cover image". Migrated automatically.',
    ),
  ],
  orderings: [
    { title: 'Newest', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', author: 'author.name', date: 'publishedAt', media: 'coverImage', legacyMedia: 'mainImage' },
    prepare({ title, author, date, media, legacyMedia }) {
      const when = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : undefined
      return { title, subtitle: [author && `by ${author}`, when].filter(Boolean).join(' · '), media: media || legacyMedia }
    },
  },
})
