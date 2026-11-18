import { defineField, defineType } from 'sanity'
import { CodeIcon } from '@sanity/icons'

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code',
  type: 'object',
  icon: CodeIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          'typescript', 'javascript', 'tsx', 'jsx', 'json', 'bash', 'html', 'css', 'scss',
          'groq', 'sql', 'python', 'php', 'swift', 'kotlin', 'yaml', 'markdown', 'text',
        ],
      },
      initialValue: 'typescript',
    }),
    defineField({ name: 'filename', title: 'Filename', type: 'string' }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 12,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { filename: 'filename', language: 'language', code: 'code' },
    prepare({ filename, language, code }) {
      return { title: filename || language || 'Code', subtitle: (code as string | undefined)?.split('\n')[0] }
    },
  },
})
