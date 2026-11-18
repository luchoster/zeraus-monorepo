import { defineField, defineType } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich text',
  type: 'object',
  icon: BlockContentIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'portableText', validation: (rule) => rule.required() }),
    ...sectionFields,
  ],
  preview: {
    select: { title: 'heading', body: 'body' },
    prepare({ title, body }) {
      const first = Array.isArray(body)
        ? body.find((b: any) => b._type === 'block')?.children?.map((c: any) => c.text).join('')
        : undefined
      return { title: title || first || 'Rich text', subtitle: 'Rich text' }
    },
  },
})
