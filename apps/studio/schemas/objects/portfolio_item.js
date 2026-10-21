export default {
  name: 'portfolio_item',
  title: 'Portfolio Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
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
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
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
