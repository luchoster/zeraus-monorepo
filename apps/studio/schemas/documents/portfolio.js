export default {
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'portfolio_item',
      title: 'Portfolio Items',
      type: 'array',
      of: [{ type: 'portfolio_item' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Portfolio Page'
      }
    }
  }
}
