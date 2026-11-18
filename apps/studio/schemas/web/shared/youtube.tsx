import * as React from 'react'
import getYoutubeID from 'get-youtube-id'
import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

function YoutubePreview({ value }: { value?: { url?: string } }) {
  const id = value?.url ? getYoutubeID(value.url) : null
  if (!id) return <div>Missing or invalid YouTube URL</div>
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube preview"
    />
  )
}

export const youtube = defineType({
  name: 'youtube',
  title: 'YouTube video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      validation: (rule) =>
        rule.required().custom((url) => (url && getYoutubeID(url) ? true : 'Not a YouTube URL')),
    }),
  ],
  components: { preview: YoutubePreview as any },
  preview: { select: { url: 'url' } },
})
