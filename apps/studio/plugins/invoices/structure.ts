import type {StructureBuilder} from 'sanity/structure'
import {FileText, SquarePen, Eye} from 'lucide-react'
import InvoicePreview from './components/InvoicePreview'

export function invoicesStructure(S: StructureBuilder) {
  return S.listItem()
    .title('Invoices')
    .icon(FileText)
    .child(
      S.documentTypeList('invoices')
        .title('Invoices')
        .child(() =>
          S.document()
            .schemaType('invoices')
            .views([
              S.view.form().icon(SquarePen),
              S.view.component(InvoicePreview).icon(Eye).title('Preview'),
            ]),
        )
        .defaultOrdering([{field: 'invoice_number', direction: 'desc'}])
        .menuItems([
          S.orderingMenuItem({
            name: 'sortByDate',
            title: 'Sort by date',
            by: [{field: 'invoice_date', direction: 'desc'}],
          }),
          S.orderingMenuItem({
            name: 'sortByInvoice',
            title: 'Sort by Invoice',
            by: [{field: 'invoice_number', direction: 'desc'}],
          }),
        ]),
    )
}
