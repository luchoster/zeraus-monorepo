export default {
  name: 'menuSubPages',
  title: 'Sub Pages',
  type: 'object',
  fields: [
    {
      name: 'subMenuTitle',
      title: 'Sub Menu Title',
      type: 'string'
    },
    {
      name: 'subMenuSlug',
      type: 'string',
      description:
        'Make sure this slug matches the slug generated in the page itself'
    }
  ]
}
