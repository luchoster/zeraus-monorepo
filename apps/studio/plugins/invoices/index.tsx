import InvoicesDashboard from './Invoices'
import {FileText} from 'lucide-react'

export default {
  name: 'invoices-tool',
  title: 'Invoices',
  tools: (prev: any) => [
    ...prev,
    {
      name: 'invoices',
      title: 'Invoices',
      icon: FileText,
      component: InvoicesDashboard,
    },
  ],
}
