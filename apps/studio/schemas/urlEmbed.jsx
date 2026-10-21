import * as React from 'react'

const EmbedPreview = ({ value }) => {
  if (!value.url) {
    return <div>Missing URL</div>
  }

  return (
    <iframe
      src={value.url}
      style={{ border: 0 }}
      width="800"
      height="600"
      framlBorder="0"
      scrolling="no"
    />
  )
}

export default {
  name: 'urlEmbed',
  type: 'object',
  title: 'URL Embed',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
  components: {
    preview: EmbedPreview,
  },
  preview: {
    select: {
      url: 'url',
    },
  },
}
