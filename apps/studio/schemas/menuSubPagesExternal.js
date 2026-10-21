export default {
  name: 'menuSubPagesExternal',
  title: 'Sub Page External',
  type: 'object',
  fields: [
    {
      name: 'subMenuTitle',
      title: 'Sub Menu Title',
      type: 'string'
    },
    {
      name: 'subMenuUrl',
      type: 'url',
      description: 'Add the external link.'
    }
  ]
}
