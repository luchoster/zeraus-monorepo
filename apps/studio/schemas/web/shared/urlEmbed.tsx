import * as React from 'react'
import { defineField, defineType } from 'sanity'
import { CodeBlockIcon } from '@sanity/icons'

function EmbedPreview({ value }: { value?: { url?: string } }) {
  if (!value?.url) return <div>Missing URL</div>
  return <iframe src={value.url} style={{ border: 0 }} width="800" height="600" title="Embed preview" />
}

export const urlEmbed = defineType({
  name: 'urlEmbed',
  title: 'Embed (iframe)',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'title',
      title: 'Accessible title',
      type: 'string',
      description: 'Describes the embed for screen readers.',
    }),
  ],
  components: { preview: EmbedPreview as any },
  preview: { select: { url: 'url' } },
})
