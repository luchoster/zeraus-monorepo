export default {
  name: 'section_scrolling_separator',
  title: 'Section Scrolling Separator',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'background_color',
      type: 'string'
    },
    {
      name: 'text_color',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: `Section Separator (${title})`
      }
    }
  }
}
