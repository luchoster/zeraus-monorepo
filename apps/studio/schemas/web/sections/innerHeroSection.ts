import { defineArrayMember, defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

/** Inner-page headline layouts from the Rayo template (not home heroes). */
export const INNER_HERO_VARIANTS = [
  { title: 'Services — eyebrow + title (services listing)', value: 'services' },
  { title: 'Team — eyebrow + title + text, optional divider', value: 'team' },
  { title: 'About me — eyebrow + title/typed lines + text', value: 'aboutMe' },
  { title: 'About studio — eyebrow + title, optional values + images', value: 'aboutStudio' },
  { title: 'Contact — eyebrow + title + mailto + text', value: 'contact' },
  { title: 'Blog — title + optional tags + breadcrumbs', value: 'blog' },
  { title: 'Pricing — eyebrow + title', value: 'pricing' },
  { title: 'FAQ — eyebrow + title + text', value: 'faq' },
  { title: 'Project — link + title + meta + tags (case study style)', value: 'project' },
] as const

type Variant = (typeof INNER_HERO_VARIANTS)[number]['value']

const only =
  (...variants: Variant[]) =>
  ({ parent }: { parent?: { variant?: string } }) =>
    !variants.includes((parent?.variant ?? 'services') as Variant)

const TITLE_DECORATIONS = [
  { title: 'None', value: 'none' },
  { title: 'Image 01 (before)', value: '01' },
  { title: 'Image 02 (before)', value: '02' },
  { title: 'Image 03 (after)', value: '03' },
  { title: 'Image 04 (before)', value: '04' },
  { title: 'Image 05 (before)', value: '05' },
  { title: 'Image 06 (before)', value: '06' },
  { title: 'Image 07 (before)', value: '07' },
]

export const innerHeroSection = defineType({
  name: 'innerHeroSection',
  title: 'Inner page hero',
  type: 'object',
  icon: BlockElementIcon,
  fieldsets: [
    sectionFieldset,
    { name: 'extras', title: 'Optional extras', options: { collapsible: true, collapsed: false } },
    { name: 'project', title: 'Project meta', options: { collapsible: true, collapsed: false } },
    { name: 'studio', title: 'Studio values & images', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: 'variant',
      title: 'Layout',
      type: 'string',
      options: { list: [...INNER_HERO_VARIANTS], layout: 'radio' },
      initialValue: 'services',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label with the star icon (e.g. "Services", "Contact").',
      hidden: only('services', 'team', 'aboutMe', 'aboutStudio', 'contact', 'pricing', 'faq'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      description: 'Line breaks are kept. Required for every layout except About me when typed lines are set.',
      hidden: only('services', 'team', 'aboutMe', 'aboutStudio', 'contact', 'blog', 'pricing', 'faq', 'project'),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { variant?: string; typedLines?: string[] } | undefined
          const v = parent?.variant ?? 'services'
          if (v === 'aboutMe' && (parent?.typedLines?.length ?? 0) > 0) return true
          return value ? true : 'Title is required for this layout'
        }),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      description: 'Supporting paragraph under the title.',
      hidden: only('team', 'aboutMe', 'contact', 'faq', 'project'),
    }),
    defineField({
      name: 'titleDecoration',
      title: 'Title decoration',
      type: 'string',
      description: 'Rayo decorative image class on the H1 (headline-img-0N).',
      options: { list: TITLE_DECORATIONS },
      initialValue: 'none',
      hidden: only('services', 'team', 'aboutStudio', 'blog', 'pricing', 'faq'),
    }),
    defineField({
      name: 'typedLines',
      title: 'Typed title lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'About me only. When set, the title animates through these strings instead of a static title.',
      hidden: only('aboutMe'),
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'mailtoLabel',
      title: 'Mailto label',
      type: 'string',
      description: 'Contact only. Shown as the headline email button (e.g. hello@zera.us).',
      hidden: only('contact'),
    }),
    defineField({
      name: 'mailtoEmail',
      title: 'Mailto email',
      type: 'string',
      hidden: only('contact'),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { variant?: string; mailtoLabel?: string } | undefined
          if (parent?.variant !== 'contact') return true
          if (parent?.mailtoLabel && !value) return 'Email is required when a mailto label is set'
          return true
        }),
    }),

    // Blog
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: only('blog', 'project'),
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'href', title: 'URL', type: 'string', description: 'Path or URL. Leave empty for the current page.' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
      hidden: only('blog'),
      validation: (rule) => rule.max(6),
    }),

    // Team extras
    defineField({
      name: 'showDivider',
      title: 'Show parallax divider',
      type: 'boolean',
      initialValue: false,
      fieldset: 'extras',
      hidden: only('team'),
    }),
    defineField({
      name: 'dividerImage',
      title: 'Divider image',
      type: 'imageWithAlt',
      fieldset: 'extras',
      hidden: ({ parent }) => parent?.variant !== 'team' || !parent?.showDivider,
    }),
    defineField({
      name: 'rotatingCtaText',
      title: 'Rotating button text',
      type: 'string',
      description: 'Text around the circle button. Repeat with * separators as in the template.',
      fieldset: 'extras',
      hidden: only('team'),
    }),
    defineField({
      name: 'rotatingCtaLink',
      title: 'Rotating button link',
      type: 'link',
      fieldset: 'extras',
      hidden: ({ parent }) => parent?.variant !== 'team' || !parent?.rotatingCtaText,
    }),
    defineField({
      name: 'rotatingCtaImage',
      title: 'Rotating button image',
      type: 'imageWithAlt',
      fieldset: 'extras',
      hidden: ({ parent }) => parent?.variant !== 'team' || !parent?.rotatingCtaText,
    }),

    // About studio
    defineField({
      name: 'valuesLeft',
      title: 'Values list (left)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      fieldset: 'studio',
      hidden: only('aboutStudio'),
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'valuesRight',
      title: 'Values list (right)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      fieldset: 'studio',
      hidden: only('aboutStudio'),
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'imageLeft',
      title: 'Image (left / large)',
      type: 'imageWithAlt',
      fieldset: 'studio',
      hidden: only('aboutStudio'),
    }),
    defineField({
      name: 'imageRight',
      title: 'Image (right / small)',
      type: 'imageWithAlt',
      fieldset: 'studio',
      hidden: only('aboutStudio'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      fieldset: 'studio',
      description: 'Paragraph beside the studio images.',
      hidden: only('aboutStudio'),
    }),

    // Project
    defineField({
      name: 'projectLinkLabel',
      title: 'Project link label',
      type: 'string',
      fieldset: 'project',
      description: 'e.g. "Project Page".',
      hidden: only('project'),
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      fieldset: 'project',
      hidden: only('project'),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      fieldset: 'project',
      hidden: only('project'),
    }),
    defineField({
      name: 'servicesLabel',
      title: 'Services',
      type: 'string',
      fieldset: 'project',
      description: 'Plain text, e.g. "Web development".',
      hidden: only('project'),
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'string',
      fieldset: 'project',
      hidden: only('project'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      fieldset: 'project',
      description: 'e.g. "January 2025" or "2025".',
      hidden: only('project'),
    }),

    defineField({
      name: 'paddingClass',
      title: 'Padding class override',
      type: 'string',
      fieldset: 'settings',
      description:
        'Optional Rayo padding class (e.g. padding-text-pre-block). Leave empty to use the layout default.',
    }),

    ...sectionFields,
  ],
  preview: {
    select: { variant: 'variant', title: 'title', eyebrow: 'eyebrow' },
    prepare({ variant, title, eyebrow }) {
      const label = INNER_HERO_VARIANTS.find((v) => v.value === (variant ?? 'services'))?.title.split(' — ')[0]
      const text = (title as string | undefined)?.split('\n')[0] || eyebrow
      return {
        title: text || 'Inner page hero',
        subtitle: `Inner hero · ${label ?? 'Services'}`,
        media: BlockElementIcon,
      }
    },
  },
})
