import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'simplePortableText', validation: (rule) => rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. "Brand Manager"' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'companyUrl', title: 'Company URL', type: 'url', validation: (rule) => rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'avatar', title: 'Author photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'companyLogo', title: 'Company logo', type: 'image' }),
    defineField({ name: 'image', title: 'Feature image', type: 'imageWithAlt', description: 'Large image next to the quote in the slider.' }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      validation: (rule) => rule.integer().min(1).max(5),
    }),
    defineField({ name: 'caseStudy', title: 'Case study', type: 'reference', to: [{ type: 'caseStudy' }] }),
  ],
  preview: {
    select: { author: 'author', company: 'company', media: 'avatar' },
    prepare({ author, company, media }) {
      return { title: author || 'Testimonial', subtitle: company, media }
    },
  },
})
