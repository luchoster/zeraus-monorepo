export default {
  name: 'services',
  title: 'Services',
  type: 'object',
  fields: [
    {
      name: 'single',
      type: 'array',
      of: [{ type: 'services_single' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Services'
      }
    }
  }
}
