import { defineArrayMember, defineField, defineType } from 'sanity'
import { RocketIcon, ImageIcon, PlayIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

/** The Rayo hero layouts, selectable per page. */
export const HERO_VARIANTS = [
  { title: 'Software company — wordmark, media marquee, divider video (Rayo hero 03)', value: 'software' },
  { title: 'Agency — floating images, word marquee, video (hero 01)', value: 'agency' },
  { title: 'Pinned fullscreen — caption, marquee, case-study wall (hero 02)', value: 'pinned' },
  { title: 'Design studio — image block, avatars, lists, marquee (hero 04)', value: 'studio' },
  { title: 'Web agency — headline, avatars, works + video blocks (hero 05)', value: 'webAgency' },
  { title: 'Freelancer — background video, lists, rotating button (hero 06)', value: 'freelancer' },
  { title: 'Creative developer — circle image, counters, tags (hero 07)', value: 'creativeDeveloper' },
  { title: 'Designer — rotating image, mark, video (hero 08)', value: 'designer' },
  { title: 'Personal — caption, big name, tags, counters (hero 09)', value: 'personal' },
] as const

type Variant = (typeof HERO_VARIANTS)[number]['value']
const ALL: Variant[] = HERO_VARIANTS.map((v) => v.value)

/** Hide a field unless the current variant is one of `variants`. */
const only =
  (...variants: Variant[]) =>
  ({ parent }: { parent?: { variant?: string } }) =>
    !variants.includes((parent?.variant ?? 'software') as Variant)

/** One item of a hero image strip / floating image group. */
export const heroMedia = defineType({
  name: 'heroMedia',
  title: 'Hero media',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video loop', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      hidden: ({ parent }) => parent?.kind !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video (short loop, mp4/webm)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Keep it a few seconds and a few MB — this is served as a plain file.',
      hidden: ({ parent }) => parent?.kind !== 'video',
    }),
    defineField({
      name: 'poster',
      title: 'Video poster',
      type: 'image',
      hidden: ({ parent }) => parent?.kind !== 'video',
    }),
    defineField({
      name: 'animation',
      title: 'Idle animation',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Float', value: 'move' },
          { title: 'Pulse', value: 'pulse' },
          { title: 'Pulse (small)', value: 'pulse-small' },
          { title: 'Rotate', value: 'rotate' },
          { title: 'Slow rotate', value: 'rotate-slow' },
        ],
      },
      initialValue: 'none',
      hidden: ({ parent }) => parent?.kind !== 'image',
    }),
  ],
  preview: {
    select: { kind: 'kind', image: 'image', alt: 'image.alt', poster: 'poster', filename: 'video.asset.originalFilename' },
    prepare({ kind, image, alt, poster, filename }) {
      const isVideo = kind === 'video'
      return {
        title: isVideo ? filename || 'Video' : alt || 'Image',
        subtitle: isVideo ? 'Video loop' : 'Image',
        media: isVideo ? poster || PlayIcon : image || ImageIcon,
      }
    },
  },
})

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  icon: RocketIcon,
  fieldsets: [
    sectionFieldset,
    { name: 'video', title: 'Video', options: { collapsible: true, collapsed: false } },
    { name: 'proof', title: 'Social proof', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: 'variant',
      title: 'Layout',
      type: 'string',
      options: { list: [...HERO_VARIANTS], layout: 'radio' },
      initialValue: 'software',
      validation: (rule) => rule.required(),
    }),

    // ── Text ─────────────────────────────────────────────
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
      description: 'Short lines above the headline. Line breaks are kept.',
      hidden: only('software', 'pinned', 'personal'),
    }),
    defineField({
      name: 'wordmark',
      title: 'Wordmark',
      type: 'string',
      description: 'The big H1 text. Leave empty to use the wordmark from Site Settings.',
      hidden: only('software'),
    }),
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'text',
      rows: 2,
      description: 'One line per row. Layouts with a star icon place it before the last row.',
      hidden: only('agency', 'studio', 'webAgency', 'freelancer', 'creativeDeveloper', 'designer', 'personal'),
      validation: (rule) =>
        rule.custom((value, context) => {
          const v = (context.parent as { variant?: string } | undefined)?.variant ?? 'software'
          return v !== 'software' && v !== 'pinned' && !value ? 'Headline is required for this layout' : true
        }),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short line next to the image block (e.g. "Creative development studio").',
      hidden: only('studio', 'webAgency'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simplePortableText',
      hidden: only('agency', 'studio', 'webAgency', 'freelancer', 'creativeDeveloper', 'designer'),
    }),
    defineField({
      name: 'marqueeItems',
      title: 'Marquee words',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: only('agency', 'pinned', 'studio', 'freelancer', 'creativeDeveloper'),
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: 'valuesLeft',
      title: 'List / tags (left)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: only('pinned', 'studio', 'freelancer', 'creativeDeveloper', 'personal'),
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'valuesRight',
      title: 'List / tags (right)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: only('pinned', 'studio', 'freelancer', 'creativeDeveloper', 'personal'),
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'availabilityMark',
      title: 'Status mark',
      type: 'string',
      description: 'Small pulsing badge, e.g. "Available for new projects".',
      hidden: only('freelancer', 'creativeDeveloper', 'designer', 'personal'),
    }),
    defineField({
      name: 'cta',
      title: 'Button',
      type: 'link',
      description: 'Scroll / explore button. Use an anchor link (e.g. "work") to scroll to a section.',
      hidden: only('agency', 'pinned', 'studio', 'webAgency', 'freelancer', 'creativeDeveloper', 'personal'),
    }),

    // ── Media ────────────────────────────────────────────
    defineField({
      name: 'media',
      title: 'Images',
      type: 'array',
      description:
        'Software: the marquee strip (2–8). Agency: 3 floating images. Design studio: main image + background object. Other layouts use the first image.',
      of: [defineArrayMember({ type: 'heroMedia' })],
      hidden: only(...ALL.filter((v) => v !== 'freelancer')),
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'stats',
      title: 'Counters',
      type: 'array',
      of: [defineArrayMember({ type: 'stat' })],
      hidden: only('creativeDeveloper', 'personal'),
      validation: (rule) => rule.max(2),
    }),

    // ── Video ────────────────────────────────────────────
    defineField({
      name: 'dividerVideo',
      title: 'Video',
      type: 'object',
      fieldset: 'video',
      description: 'Software: full-width parallax divider. Agency/Designer: small video card. Web agency: video block. Freelancer: background video.',
      hidden: only('software', 'agency', 'webAgency', 'freelancer', 'designer'),
      fields: [
        defineField({
          name: 'video',
          title: 'Video (mp4/webm)',
          type: 'file',
          options: { accept: 'video/mp4,video/webm' },
        }),
        defineField({ name: 'poster', title: 'Poster', type: 'image' }),
      ],
    }),
    defineField({
      name: 'videoModalUrl',
      title: 'Showreel URL (play button)',
      type: 'url',
      fieldset: 'video',
      description: 'YouTube or Vimeo link opened by the play button.',
      hidden: only('agency', 'designer'),
    }),

    // ── Social proof ─────────────────────────────────────
    defineField({
      name: 'trustAvatars',
      title: 'Avatars',
      type: 'array',
      fieldset: 'proof',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      hidden: only('studio', 'webAgency'),
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'trustText',
      title: 'Avatars text',
      type: 'text',
      rows: 2,
      fieldset: 'proof',
      description: 'Two lines, e.g. "Trusted by" / "50+ clients".',
      hidden: only('studio', 'webAgency'),
    }),

    ...sectionFields,
  ],
  preview: {
    select: { variant: 'variant', caption: 'caption', title: 'title', wordmark: 'wordmark', media: 'media.0.image' },
    prepare({ variant, caption, title, wordmark, media }) {
      const label = HERO_VARIANTS.find((v) => v.value === (variant ?? 'software'))?.title.split(' — ')[0]
      const text = (title as string | undefined)?.split('\n')[0] || (caption as string | undefined)?.split('\n')[0] || wordmark
      return { title: text || 'Hero', subtitle: `Hero · ${label ?? 'Software company'}`, media: media || RocketIcon }
    },
  },
})
