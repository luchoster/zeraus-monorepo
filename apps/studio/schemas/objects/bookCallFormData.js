export default {
  name: 'bookCallFormData',
  type: 'object',
  title: 'Form Data',
  fields: [
    {
      name: 'budget',
      type: 'string'
    },
    {
      name: 'service',
      type: 'string'
    },
    {
      name: 'email',
      type: 'email',
      title: 'Email'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Message'
    }
  ]
}
