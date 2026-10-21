export default {
  name: 'crew_single',
  title: 'Crew Single',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'avatar',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'intro',
      type: 'blockContent'
    },
    {
      name: 'email',
      type: 'email'
    },
    {
      name: 'twitter_handle',
      description: 'Do not add the @',
      type: 'string'
    },
    {
      name: 'website',
      description: 'Personal website or Blog.',
      type: 'url'
    }
  ]
}
