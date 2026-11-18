import * as shared from './shared'
import * as sections from './sections'
import * as documents from './documents'

export { SINGLETON_TYPES, LEGACY_WEB_TYPES } from './legacy'
export { SECTION_TYPES } from './sections/pageBuilder'

/** All v3 website types, in registration order (shared → sections → documents). */
const isType = (t: unknown): t is { name: string } =>
  Boolean(t) && typeof t === 'object' && !Array.isArray(t) && 'name' in (t as object)

export const webSchemaTypes = [
  ...Object.values(shared),
  ...Object.values(sections),
  ...Object.values(documents),
].filter(isType)
