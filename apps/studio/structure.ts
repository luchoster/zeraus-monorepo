import type { CurrentUser } from 'sanity'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  MenuIcon,
  HomeIcon,
  DocumentIcon,
  WrenchIcon,
  CaseIcon,
  StarIcon,
  CodeIcon,
  CommentIcon,
  UsersIcon,
  DocumentTextIcon,
  TagIcon,
  HelpCircleIcon,
  EnvelopeIcon,
  UserIcon,
  EditIcon,
  EyeOpenIcon,
  BillIcon,
  ChartUpwardIcon,
  FolderIcon,
  RocketIcon,
} from '@sanity/icons'
import Invoice from './plugins/invoices/components/InvoicePreview'

/** administrator, or a custom role named "developer" */
export function isAdminLike(user: Pick<CurrentUser, 'roles'> | null | undefined): boolean {
  return Boolean(user?.roles?.some((r) => r.name === 'administrator' || r.name === 'developer'))
}

const singleton = (S: StructureBuilder, type: string, title: string, icon: React.ComponentType) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title))

const typeList = (S: StructureBuilder, type: string, title: string, icon: React.ComponentType, ordering?: { field: string; direction: 'asc' | 'desc' }) => {
  let list = S.documentTypeList(type).title(title)
  if (ordering) list = list.defaultOrdering([ordering])
  return S.listItem().title(title).icon(icon).id(type).child(list)
}

export const structure: StructureResolver = (S, context) => {
  const admin = isAdminLike(context.currentUser)

  const website = S.listItem()
    .title('Website')
    .icon(RocketIcon)
    .id('website')
    .child(
      S.list()
        .title('Website')
        .items([
          singleton(S, 'siteSettings', 'Site Settings', CogIcon),
          singleton(S, 'navigation', 'Navigation', MenuIcon),
          singleton(S, 'homePage', 'Home Page', HomeIcon),
          S.divider(),
          typeList(S, 'page', 'Pages', DocumentIcon, { field: 'title', direction: 'asc' }),
          typeList(S, 'service', 'Services', WrenchIcon, { field: 'order', direction: 'asc' }),
          typeList(S, 'caseStudy', 'Case Studies', CaseIcon, { field: 'order', direction: 'asc' }),
          typeList(S, 'partner', 'Partners', StarIcon, { field: 'order', direction: 'asc' }),
          typeList(S, 'techStack', 'Tech Stack', CodeIcon, { field: 'order', direction: 'asc' }),
          typeList(S, 'testimonial', 'Testimonials', CommentIcon, { field: '_createdAt', direction: 'desc' }),
          typeList(S, 'teamMember', 'Team', UsersIcon, { field: 'order', direction: 'asc' }),
          S.divider(),
          S.listItem()
            .title('Insights')
            .icon(DocumentTextIcon)
            .id('insights')
            .child(
              S.list()
                .title('Insights')
                .items([
                  typeList(S, 'post', 'Posts', DocumentTextIcon, { field: 'publishedAt', direction: 'desc' }),
                  typeList(S, 'category', 'Categories', TagIcon, { field: 'title', direction: 'asc' }),
                ]),
            ),
          typeList(S, 'faq', 'FAQs', HelpCircleIcon, { field: 'order', direction: 'asc' }),
        ]),
    )

  const leads = S.listItem()
    .title('Leads')
    .icon(EnvelopeIcon)
    .id('leads')
    .child(
      S.list()
        .title('Leads')
        .items([
          typeList(S, 'bookCallForm', 'Book-a-Call Leads', UserIcon, { field: '_createdAt', direction: 'desc' }),
          typeList(S, 'contactForm', 'Contact Form', EnvelopeIcon, { field: '_createdAt', direction: 'desc' }),
        ]),
    )

  const business = S.listItem()
    .title('Business')
    .icon(FolderIcon)
    .id('business')
    .child(
      S.list()
        .title('Business')
        .items([
          typeList(S, 'clients', 'Clients', UsersIcon, { field: 'client_name', direction: 'asc' }),
          S.listItem()
            .title('Invoices')
            .icon(BillIcon)
            .id('invoices')
            .child(
              S.documentTypeList('invoices')
                .title('Invoices')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('invoices')
                    .views([
                      S.view.form().icon(EditIcon),
                      S.view.component(Invoice).icon(EyeOpenIcon).title('Preview'),
                    ]),
                )
                .defaultOrdering([{ field: 'invoice_number', direction: 'desc' }])
                .menuItems([
                  S.orderingMenuItem({ name: 'byDate', title: 'Sort by date', by: [{ field: 'invoice_date', direction: 'desc' }] }),
                  S.orderingMenuItem({ name: 'byInvoice', title: 'Sort by Invoice', by: [{ field: 'invoice_number', direction: 'desc' }] }),
                ]),
            ),
          typeList(S, 'expenses', 'Expenses', ChartUpwardIcon, { field: 'date', direction: 'desc' }),
          typeList(S, 'expense_category', 'Expense Categories', TagIcon, { field: 'name', direction: 'asc' }),
          S.divider(),
          typeList(S, 'project', 'Client Projects', FolderIcon, { field: 'title', direction: 'asc' }),
          typeList(S, 'person', 'Persons', UserIcon, { field: 'name', direction: 'asc' }),
        ]),
    )

  return S.list()
    .title('Content')
    .items(admin ? [website, leads, S.divider(), business] : [website, leads])
}
