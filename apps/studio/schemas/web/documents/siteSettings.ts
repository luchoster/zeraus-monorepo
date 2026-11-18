import { defineArrayMember, defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'
import { legacyField } from '../legacy'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'brand', title: 'Brand' },
    { name: 'contact', title: 'Contact & social' },
    { name: 'header', title: 'Header & menu' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO & analytics' },
    { name: 'legacy', title: 'Legacy (v2)' },
  ],
  fields: [
    // ── General ─────────────────────────────────────────────
    defineField({ name: 'title', title: 'Site name', type: 'string', group: 'general', initialValue: 'ZERAus', validation: (rule) => rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'general', initialValue: 'Digital Studio' }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'general',
      description: 'Canonical origin, no trailing slash (https://zera.us).',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }).custom((v) => (!v || !v.endsWith('/') ? true : 'Remove the trailing slash')),
    }),
    defineField({
      name: 'defaultColorScheme',
      title: 'Default colour scheme',
      type: 'string',
      group: 'general',
      options: { list: [{ title: 'Dark', value: 'dark' }, { title: 'Light', value: 'light' }], layout: 'radio', direction: 'horizontal' },
      initialValue: 'dark',
    }),

    // ── Brand ───────────────────────────────────────────────
    defineField({ name: 'logo', title: 'Logo (dark scheme)', type: 'image', group: 'brand', description: 'SVG preferred.' }),
    defineField({ name: 'logoLight', title: 'Logo (light scheme)', type: 'image', group: 'brand' }),
    defineField({
      name: 'wordmark',
      title: 'Wordmark',
      type: 'string',
      group: 'brand',
      description: 'Big text in the hero and footer.',
      initialValue: 'zera.us',
    }),

    // ── Contact & social ────────────────────────────────────
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string', group: 'contact', validation: (rule) => rule.email() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3, group: 'contact' }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({ type: 'socialLink' })],
    }),

    // ── Header & menu ───────────────────────────────────────
    defineField({ name: 'headerCta', title: 'Header button', type: 'link', group: 'header' }),
    defineField({
      name: 'menuPromo',
      title: 'Menu promo card',
      type: 'object',
      group: 'header',
      description: 'Caption + looping video shown inside the full-screen menu.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        defineField({ name: 'video', title: 'Video (mp4/webm, short loop)', type: 'file', options: { accept: 'video/mp4,video/webm' } }),
        defineField({ name: 'poster', title: 'Poster', type: 'image' }),
      ],
    }),

    // ── Footer ──────────────────────────────────────────────
    defineField({
      name: 'footerNavGroups',
      title: 'Footer navigation',
      type: 'array',
      group: 'footer',
      description: 'Link groups shown in the site footer. Prefer this over Navigation → Footer menu.',
      of: [defineArrayMember({ type: 'footerNavGroup' })],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links',
      type: 'array',
      group: 'footer',
      description: 'Privacy policy, terms…',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({ name: 'copyright', title: 'Copyright line', type: 'string', group: 'footer', description: 'Year is added automatically.' }),

    // ── SEO & analytics ─────────────────────────────────────
    defineField({ name: 'seo', title: 'Default SEO', type: 'seo', group: 'seo', description: 'Used where a page has no SEO of its own.' }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'gaId', title: 'Google Analytics ID', type: 'string', description: 'G-XXXXXXXXXX' }),
      ],
    }),

    // ── Legacy (v2 fields, migrated in phase 2) ─────────────
    legacyField(defineField({ name: 'site_url', title: 'Website URL (legacy)', type: 'url' }), 'Replaced by "Site URL".'),
    legacyField(defineField({ name: 'description', title: 'Description (legacy)', type: 'text' }), 'Replaced by Default SEO → meta description.'),
    legacyField(defineField({ name: 'keywords', title: 'Keywords (legacy)', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }), 'Replaced by Default SEO → keywords.'),
    legacyField(defineField({ name: 'author', title: 'Author (legacy)', type: 'string' }), 'No longer used.'),
    legacyField(defineField({ name: 'seo_image', title: 'Main SEO image (legacy)', type: 'image' }), 'Replaced by Default SEO → social share image.'),
    legacyField(defineField({ name: 'social_links', title: 'Social links (legacy)', type: 'array', of: [{ type: 'social_links' }] }), 'Replaced by "Social links".'),
    legacyField(defineField({ name: 'main_contact_email', title: 'Contact email (legacy)', type: 'string' }), 'Replaced by "Contact email".'),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
