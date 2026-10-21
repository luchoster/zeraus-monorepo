export default {
  name: 'section_content',
  title: 'Section Content',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'subtitle',
      type: 'string'
    },
    {
      name: 'short_sentence',
      type: 'string'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: `Content Section (${title})`
      }
    }
  }
}
