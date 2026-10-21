// We import object and document schemas
import blockContent from './blockContent'
import customImage from './image'
// import homePage from './homePage'
import credits_list from './credits_list'
import imageWGL from './imageWGL'
import menuPages from './menuPages'
import menuSubPages from './menuSubPages'
import menuSubPagesExternal from './menuSubPagesExternal'
import urlEmbed from './urlEmbed'
import youtube from './youtube'

import * as objects from './objects'
import * as plugs from './plugs'
import * as documents from './documents'

const allPlugs = Object.values(plugs).map((plug: any) => {
  return { ...plug }
})
const allObjects = Object.values(objects).map((ob: any) => {
  return { ...ob }
})
const allDocuments = Object.values(documents).map((doc: any) => {
  return { ...doc }
})

const documentTypes = [
  ...allDocuments,
  ...allObjects,
  ...allPlugs,
  credits_list,
  customImage,
  imageWGL,
  menuPages,
  menuSubPages,
  menuSubPagesExternal,
  urlEmbed,
  youtube,
  // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  blockContent,
]

// NOTE: keep this alphabetized
const objectTypes: any[] = []

export const schemaTypes = [...documentTypes, ...objectTypes]
