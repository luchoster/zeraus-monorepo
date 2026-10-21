import * as React from 'react'
import getYoutubeID from 'get-youtube-id'
import { FaYoutube } from 'react-icons/fa'

const YoutubePreview = ({ value }) => {
  const id = getYoutubeID(value.url)
  const url = `https://www.youtube.com/embed/${id}`

  if (!id) {
    return <div>Missing YouTube URL</div>
  }

  return (
    <iframe
      width="560"
      height="315"
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'Youtube Embed',
  icon: FaYoutube,
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
  components: {
    preview: YoutubePreview,
  },
  preview: {
    select: {
      url: 'url',
    },
  },
}
