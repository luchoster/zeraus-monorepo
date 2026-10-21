export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: 'Hero' },
    { name: 'internalUse', title: 'Internal Use' }
  ],
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'pageTitle',
      type: 'string',
      fieldset: 'internalUse'
    },
    {
      name: 'slug',
      type: 'slug',
      fieldset: 'internalUse',
      options: {
        source: 'pageTitle',
        maxLength: 96
      }
    },
    {
      name: 'seo',
      title: 'SEO Meta',
      type: 'pageSeo',
      options: { collapsible: true, collapsed: true }
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
      name: 'content',
      type: 'array',
      title: 'Page sections',
      description: 'Add, edit, and reorder sections',
      of: [
        { type: 'section_title' },
        { type: 'section_content' },
        { type: 'services' },
        { type: 'credits_list' }
        // { type: 'infoRows' },
        // { type: 'ctaColumns' },
        // { type: 'ctaPlug' },
      ]
    }
  ],
  preview: {
    select: {
      title: 'pageTitle'
    }
  }
}
