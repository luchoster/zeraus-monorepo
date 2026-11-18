/**
 * Schema registry.
 *
 *  - `webSchemaTypes`  → v3 website model (schemas/web, TypeScript, docs/SCHEMA_PLAN.md §2)
 *  - business types    → frozen (invoices, expenses, clients, leads, project, person) — §6
 *  - legacy web types  → v2 objects kept registered + deprecated until the migration
 *                        is verified, then deleted in one commit (§0.3, §2.5)
 */
import blockContent from './blockContent'
import customImage from './image'
import credits_list from './credits_list'
import imageWGL from './imageWGL'
import menuPages from './menuPages'
import menuSubPages from './menuSubPages'
import menuSubPagesExternal from './menuSubPagesExternal'

import * as objects from './objects'
import * as plugs from './plugs'
import * as documents from './documents'

import { webSchemaTypes, LEGACY_WEB_TYPES } from './web'

/** v2 document types that are *replaced* by a v3 type of the same name. */
const REPLACED = new Set(['homePage', 'page', 'post', 'siteSettings'])

/** Business / admin types — do not touch (SCHEMA_PLAN §6). */
const businessTypes = [
  documents.bookCallForm,
  documents.clients,
  documents.contactForm,
  documents.expenses,
  documents.invoices,
  documents.person,
  documents.project,
  objects.bookCallFormData,
  objects.contactFormData,
  objects.expenseCategory,
  objects.invoice_item,
]

const legacySet = new Set<string>(LEGACY_WEB_TYPES)

const legacyWebTypes = [
  ...Object.values(documents),
  ...Object.values(objects),
  ...Object.values(plugs),
  credits_list,
  customImage,
  imageWGL,
  menuPages,
  menuSubPages,
  menuSubPagesExternal,
  blockContent,
]
  .filter((t: any) => legacySet.has(t.name) && !REPLACED.has(t.name))
  .map((t: any) => ({
    ...t,
    title: t.title?.includes('(legacy)') ? t.title : `${t.title ?? t.name} (legacy)`,
    deprecated: t.deprecated ?? {
      reason: 'v2 website type. Kept read-only until the v3 migration is verified (docs/SCHEMA_PLAN.md).',
    },
  }))

// Sanity rejects duplicate type names — guard against it at boot time.
const all = [...webSchemaTypes, ...businessTypes, ...legacyWebTypes]
const seen = new Set<string>()
for (const t of all as { name: string }[]) {
  if (seen.has(t.name)) throw new Error(`Duplicate schema type name: ${t.name}`)
  seen.add(t.name)
}

export const schemaTypes = all
