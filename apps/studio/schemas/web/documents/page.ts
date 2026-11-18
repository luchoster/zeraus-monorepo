import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { legacyField } from '../legacy'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
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
      description: 'URL path, e.g. "about-us" → zera.us/about-us',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'sections', title: 'Sections', type: 'pageBuilder', group: 'content' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),

    // v2 fields — read-only until migrated (SCHEMA_PLAN §3 step 9)
    legacyField(defineField({ name: 'pageTitle', title: 'Page title (legacy)', type: 'string' }), 'Replaced by "Title".'),
    legacyField(defineField({ name: 'subtitle', title: 'Subtitle (legacy)', type: 'string' }), 'Move into a section.'),
    legacyField(defineField({ name: 'short_sentence', title: 'Short sentence (legacy)', type: 'string' }), 'Move into a section.'),
    legacyField(
      defineField({
        name: 'content',
        title: 'Page sections (legacy)',
        type: 'array',
        of: [{ type: 'section_title' }, { type: 'section_content' }, { type: 'services' }, { type: 'credits_list' }],
      }),
      'Replaced by "Sections".',
    ),
  ],
  preview: {
    select: { title: 'title', legacyTitle: 'pageTitle', slug: 'slug.current' },
    prepare({ title, legacyTitle, slug }) {
      return { title: title || legacyTitle || 'Untitled page', subtitle: slug ? `/${slug}` : undefined }
    },
  },
})
