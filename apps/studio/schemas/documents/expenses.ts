import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'expenses',
  title: 'Expenses',
  type: 'document',
  fields: [
    defineField({
      name: 'business',
      title: 'Business',
      type: 'string',
      options: {
        list: [
          { title: 'Warren Burrows', value: 'wb' },
          { title: 'ZeraUS', value: 'zeraus' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'expense_category' } }],
    }),
    defineField({
      name: 'is_receipt_file',
      title: 'Is Receipt File?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'receipt',
      title: 'Receipt Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.is_receipt_file,
    }),
    defineField({
      name: 'receipt_file',
      title: 'Receipt File',
      type: 'file',
      hidden: ({ parent }) => !parent?.is_receipt_file,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})
