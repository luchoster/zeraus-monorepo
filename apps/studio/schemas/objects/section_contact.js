export default {
  name: 'section_contact',
  title: 'Contact Section',
  type: 'object',
  fields: [
    {
      name: 'image',
      type: 'imageComponent'
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      type: 'string'
    },
    {
      name: 'short_sentence',
      type: 'string'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Section'
      }
    }
  }
}
