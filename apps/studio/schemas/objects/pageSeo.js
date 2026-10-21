export default {
  name: 'pageSeo',
  title: 'SEO Meta',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'seo_image',
      title: 'Main SEO Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
