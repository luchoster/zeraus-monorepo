import { defineField, defineType } from 'sanity'
import { ShareIcon } from '@sanity/icons'

export const SOCIAL_PLATFORMS = [
  { title: 'X / Twitter', value: 'x' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'GitHub', value: 'github' },
  { title: 'Dribbble', value: 'dribbble' },
  { title: 'Behance', value: 'behance' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'Facebook', value: 'facebook' },
  { title: 'TikTok', value: 'tiktok' },
  { title: 'Other', value: 'other' },
]

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  icon: ShareIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: { list: SOCIAL_PLATFORMS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Shown in the footer. Defaults to the platform name.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { platform: 'platform', label: 'label', url: 'url' },
    prepare({ platform, label, url }) {
      const name = SOCIAL_PLATFORMS.find((p) => p.value === platform)?.title
      return { title: label || name || 'Social link', subtitle: url }
    },
  },
})
