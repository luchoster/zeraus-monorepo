export default {
  name: 'credits_list',
  title: 'Credits List',
  type: 'object',
  fields: [
    {
      name: 'credit_item',
      type: 'array',
      of: [{ type: 'credit_item' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Credits List'
      }
    }
  }
}
