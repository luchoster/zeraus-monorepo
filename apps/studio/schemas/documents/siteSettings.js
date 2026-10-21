export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  liveEdit: false,
  __experimental_actions: ['update', 'publish' /*'create', 'delete'*/],
  fieldsets: [
    {
      name: 'schedule',
      title: 'Schedule File',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 1 // Defines a grid for the fields and how many columns it should have
      }
    },
    {
      name: 'seo',
      title: 'SEO',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 1 // Defines a grid for the fields and how many columns it should have
      }
    },
    {
      name: 'parent_site',
      title: 'Parent Website',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 1 // Defines a grid for the fields and how many columns it should have
      }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Name',
      type: 'string'
    },
    {
      name: 'site_url',
      description: 'Please make sure there is no "/" at the end of the url ',
      title: 'Website URL',
      fieldset: 'seo',
      type: 'url'
    },
    {
      name: 'description',
      title: 'Description',
      fieldset: 'seo',
      type: 'text'
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      fieldset: 'seo',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      fieldset: 'seo'
    },
    {
      name: 'seo_image',
      title: 'Main SEO Image',
      type: 'image',
      fieldset: 'seo',
      options: {
        hotspot: true
      }
    },
    {
      name: 'logo',
      title: 'Main Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'social_links',
      type: 'array',
      of: [{ type: 'social_links' }]
    },
    {
      name: 'main_contact_email',
      type: 'string'
    }
  ]
}
