export default {
  name: 'social_links',
  title: 'Social Links',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'url',
      description:
        'Please include the whole URL (eg. https://facebook.com/afwerx)',
      type: 'url'
    },
    {
      name: 'icon',
      type: 'string',
      description:
        'Please enter the name of the icon from FontAwesome: https://fontawesome.com/icons?d=gallery&s=brands'
    }
  ]
}
