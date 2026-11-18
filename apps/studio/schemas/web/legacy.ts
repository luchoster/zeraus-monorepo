import type { FieldDefinition } from 'sanity'

/**
 * Helpers for the v2 → v3 transition (docs/SCHEMA_PLAN.md §0.3).
 *
 * Old *fields* on reshaped documents (`homePage`, `page`, `siteSettings`, `post`)
 * are kept read-only + deprecated, hidden when empty, so existing content stays
 * visible in the Studio and valid until the migration has run.
 * Old *types* that no longer back any new field are kept registered (see
 * `schemas/index.ts`) so that data still deserialises; they are removed in phase 4.
 */
export function legacyField<T extends FieldDefinition>(field: T, reason: string): T {
  return {
    ...field,
    group: 'legacy',
    readOnly: true,
    deprecated: { reason },
    hidden: ({ value }: { value?: unknown }) => value === undefined,
  }
}

/** Singleton document types — fixed `_id`, no create/delete/duplicate. */
export const SINGLETON_TYPES = ['siteSettings', 'navigation', 'homePage'] as const

/** v2 website types kept only so existing documents remain readable. */
export const LEGACY_WEB_TYPES = [
  'portfolio',
  'main_menu',
  'menuPages',
  'menuSubPages',
  'menuSubPagesExternal',
  'pageSeo',
  'imageComponent',
  'section_projects',
  'credits_list',
  'credit_item',
  'hero',
  'partners_logo',
  'portfolio_item',
  'section_contact',
  'section_content',
  'section_scrolling_separator',
  'section_title',
  'services',
  'services_single',
  'social_links',
  'image_plug',
  'customImage',
  'blockContent',
] as const
