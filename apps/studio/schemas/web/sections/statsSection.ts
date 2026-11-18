import { defineArrayMember, defineField, defineType } from 'sanity'
import { BarChartIcon } from '@sanity/icons'
import { sectionFields, sectionFieldset } from '../shared/sectionFields'

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Number', type: 'number', validation: (rule) => rule.required().min(0) }),
    defineField({ name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g. "+", "%", "k"' }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'text',
      rows: 2,
      description: 'Short label under the number. Line breaks are kept.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'icon', title: 'Icon / illustration', type: 'image' }),
  ],
  preview: {
    select: { value: 'value', suffix: 'suffix', label: 'label', media: 'icon' },
    prepare({ value, suffix, label, media }) {
      return { title: `${value ?? ''}${suffix ?? ''}`, subtitle: (label as string | undefined)?.replace(/\n/g, ' '), media }
    },
  },
})

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Statistics',
  type: 'object',
  icon: BarChartIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [defineArrayMember({ type: 'stat' })],
      validation: (rule) => rule.required().min(2).max(4),
    }),
    ...sectionFields,
  ],
  preview: {
    select: { stats: 'stats' },
    prepare({ stats }) {
      const list = Array.isArray(stats) ? stats : []
      return {
        title: list.map((s: any) => `${s.value ?? ''}${s.suffix ?? ''}`).join(' · ') || 'Statistics',
        subtitle: 'Statistics',
      }
    },
  },
})
