export default {
  name: 'sponsors',
  title: 'Sponsors',
  type: 'object',
  fields: [
    {
      name: 'list',
      type: 'array',
      of: [{ type: 'sponsors_list' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Sponsors List`
      }
    }
  }
}
