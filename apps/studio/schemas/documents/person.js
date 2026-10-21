export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  // icon: () => <Icon emoji="👤" />,

  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'nickname',
      title: 'Nickname',
      type: 'string'
    },
    {
      name: 'slackId',
      title: 'Slack ID',
      type: 'string'
    },
    {
      name: 'sanityId',
      title: 'Sanity ID',
      type: 'string',
      desciption: 'Sanity UserID'
    },
    {
      name: 'github',
      title: 'GitHub Username',
      type: 'string'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    },
    {
      name: 'email',
      type: 'email',
      title: 'email'
    },
    {
      name: 'bio',
      type: 'array',
      title: 'Bio',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
}
