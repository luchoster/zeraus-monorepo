import { defineConfig, type DocumentActionComponent } from 'sanity'
import { assist } from '@sanity/assist'
import { dashboardTool } from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { embeddingsIndexDashboard } from '@sanity/embeddings-index-ui'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { sanityConfig } from '@zeraus/sanity-config'

import { structure, isAdminLike } from './structure'
import { schemaTypes } from './schemas'
import { SINGLETON_TYPES, LEGACY_WEB_TYPES } from './schemas/web'
import { locations } from './src/lib/presentation'

import FormSubmissions from './plugins/form-submissions'
import Invoices from './plugins/invoices'
import Expenses from './plugins/expenses'

const SINGLETONS = new Set<string>(SINGLETON_TYPES)
const LEGACY = new Set<string>(LEGACY_WEB_TYPES)

/** Singletons: no delete / duplicate / unpublish; the structure pins their `_id`. */
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

/** Set `SANITY_STUDIO_PREVIEW_URL` to enable the Presentation tool (phase 3 adds the draft-mode route). */
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL

/** Tools everyone gets; admins/developers get everything. */
const PUBLIC_TOOLS = new Set(['structure', 'dashboard', 'presentation'])

export default defineConfig({
  name: 'ZERAUS',
  title: 'ZERAus',
  projectId: sanityConfig.projectId,
  basePath: '/',
  dataset: sanityConfig.dataset,
  plugins: [
    structureTool({ structure }),
    ...(previewOrigin
      ? [
          presentationTool({
            previewUrl: {
              origin: previewOrigin,
              previewMode: { enable: '/api/draft-mode/enable' },
            },
            resolve: { locations },
          }),
        ]
      : []),
    dashboardTool({ widgets: [FormSubmissions] }),
    Invoices,
    Expenses,
    assist(),
    visionTool(),
    ...(process.env.NODE_ENV === 'development' ? [embeddingsIndexDashboard()] : []),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons and legacy v2 types from the "Create new" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType) && !LEGACY.has(schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) => {
      if (SINGLETONS.has(schemaType)) {
        return prev.filter(({ action }: DocumentActionComponent) => action && SINGLETON_ACTIONS.has(action))
      }
      return prev
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((t) => !SINGLETONS.has(t.templateId) && !LEGACY.has(t.templateId))
      }
      return prev
    },
  },
  tools: (prev, { currentUser }) => {
    if (isAdminLike(currentUser)) return prev
    return prev.filter((tool) => PUBLIC_TOOLS.has(tool.name))
  },
})
