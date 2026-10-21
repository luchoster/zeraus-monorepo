import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'theme', title: 'Theme' },
    { name: 'integrations', title: 'Integrations' },
    { name: 'provisioning', title: 'Provisioning' },
  ],
  fields: [
    // ── General ──────────────────────────────────
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'general',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      group: 'general',
    }),
    defineField({
      name: 'template',
      type: 'object',
      title: 'Template',
      group: 'general',
      fields: [
        defineField({ name: 'repo', type: 'string', title: 'GitHub Repo' }),
      ],
    }),
    defineField({
      name: 'dataset',
      type: 'string',
      title: 'Dataset Template',
      group: 'general',
    }),

    // ── Theme ────────────────────────────────────
    defineField({
      name: 'colors',
      type: 'array',
      title: 'Colors',
      group: 'theme',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'fonts',
      type: 'object',
      title: 'Fonts',
      group: 'theme',
      fields: [
        defineField({
          name: 'heading',
          type: 'object',
          title: 'Heading Font',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({
              name: 'cssImport',
              type: 'string',
              title: 'CSS Import',
            }),
          ],
        }),
        defineField({
          name: 'body',
          type: 'object',
          title: 'Body Font',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({
              name: 'cssImport',
              type: 'string',
              title: 'CSS Import',
            }),
          ],
        }),
      ],
    }),

    // ── Integrations ─────────────────────────────
    defineField({
      name: 'sanity',
      type: 'object',
      title: 'Sanity',
      group: 'integrations',
      fields: [
        defineField({ name: 'id', type: 'string', title: 'Project ID' }),
      ],
    }),
    defineField({
      name: 'vercel',
      type: 'object',
      title: 'Vercel',
      group: 'integrations',
      fields: [
        defineField({ name: 'id', type: 'string', title: 'Project ID' }),
        defineField({
          name: 'deploy_hook',
          type: 'string',
          title: 'Deploy Hook',
        }),
      ],
    }),
    defineField({
      name: 'resend',
      type: 'object',
      title: 'Resend',
      group: 'integrations',
      fields: [
        defineField({ name: 'apiKey', type: 'string', title: 'API Key' }),
        defineField({ name: 'toEmail', type: 'string', title: 'To Email' }),
        defineField({ name: 'fromEmail', type: 'string', title: 'From Email' }),
      ],
    }),

    // ── Provisioning ─────────────────────────────
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      group: 'provisioning',
      options: {
        list: [
          'pending',
          'provisioning',
          'complete',
          'error',
          'deleting',
          'delete-in-progress',
        ],
      },
    }),
    defineField({
      name: 'provisionStep',
      type: 'string',
      title: 'Provision Step',
      group: 'provisioning',
    }),
    defineField({
      name: 'error',
      type: 'string',
      title: 'Error',
      group: 'provisioning',
    }),
    defineField({
      name: 'log',
      type: 'array',
      title: 'Log',
      group: 'provisioning',
      of: [{ type: 'string' }],
    }),
  ],
})
