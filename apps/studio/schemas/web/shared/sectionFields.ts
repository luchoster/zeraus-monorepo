import { defineField } from 'sanity'

/**
 * Fields every page-builder section shares.
 * `theme` maps to Rayo's `bg-*` section classes; `anchor` becomes the
 * section's `id` so links of kind "anchor" can target it.
 */
export const SECTION_THEMES = [
  { title: 'Default', value: 'default' },
  { title: 'Accent (light-blue)', value: 'accent' },
  { title: 'Additional (cobalt)', value: 'additional' },
  { title: 'Opposite (inverted)', value: 'opposite' },
] as const

export const sectionFieldset = {
  name: 'settings',
  title: 'Section settings',
  options: { collapsible: true, collapsed: true },
}

export const sectionFields = [
  defineField({
    name: 'anchor',
    title: 'Anchor ID',
    type: 'string',
    fieldset: 'settings',
    description: 'Optional. Lowercase, hyphens only (e.g. "our-work"). Used for in-page links.',
    validation: (rule) =>
      rule.custom((value) => {
        if (!value) return true
        return /^[a-z0-9-]+$/.test(value) || 'Use lowercase letters, numbers and hyphens only'
      }),
  }),
  defineField({
    name: 'theme',
    title: 'Theme',
    type: 'string',
    fieldset: 'settings',
    options: { list: [...SECTION_THEMES], layout: 'radio', direction: 'horizontal' },
    initialValue: 'default',
  }),
]
