export default {
  name: 'partners_logo',
  title: 'Partners Logo',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'clientLogo'
    }
  }
}
