import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { legacyField } from '../legacy'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Sections', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'legacy', title: 'Legacy (v2)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      group: 'content',
      initialValue: 'Home',
      description: 'Only shown in the Studio.',
    }),
    defineField({ name: 'sections', title: 'Sections', type: 'pageBuilder', group: 'content' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),

    // v2 fields — read-only until migrated (SCHEMA_PLAN §3 steps 3–8, 12)
    legacyField(defineField({ name: 'hero_title', title: 'Hero title (legacy)', type: 'string' }), 'Becomes the Hero section wordmark.'),
    legacyField(defineField({ name: 'hero_content', title: 'Hero content (legacy)', type: 'text' }), 'Becomes the Hero section caption.'),
    legacyField(defineField({ name: 'about_block', title: 'About block (legacy)', type: 'section_content' }), 'Becomes an About section.'),
    legacyField(defineField({ name: 'partners_marquee', title: 'Partners (legacy)', type: 'array', of: [{ type: 'partners_logo' }] }), 'Becomes Partner documents.'),
    legacyField(defineField({ name: 'services', title: 'Services (legacy)', type: 'array', of: [{ type: 'services_single' }] }), 'Becomes Service documents.'),
    legacyField(defineField({ name: 'projects', title: 'Projects (legacy)', type: 'array', of: [{ type: 'section_projects' }] }), 'Becomes featured Case studies.'),
    legacyField(defineField({ name: 'contact_section', title: 'Contact section (legacy)', type: 'section_contact' }), 'Becomes a Call-to-action section.'),
  ],
  preview: {
    select: { sections: 'sections' },
    prepare({ sections }) {
      const count = Array.isArray(sections) ? sections.length : 0
      return { title: 'Home Page', subtitle: `${count} section${count === 1 ? '' : 's'}` }
    },
  },
})
