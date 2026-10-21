import * as React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import InvoiceTemplate from '../plugins/invoices/components/invoiceTemplate.jsx'
import { useClient } from "sanity";
import { notNilOrEmpty } from '../utils/Helpers'

function Invoice(props: any) {
  const [invoices, setInvoices] = React.useState()
  const client = useClient({ apiVersion: "2021-03-25" });

  React.useEffect(() => {
    getClient()
  }, [])

  function getClient() {
    const query = `*[_type == "invoices" && _id == "${props.document.displayed._id}"] {
      ...,
      "client": clients->
    }`

    client.fetch(query).then((entry) => {
      setInvoices(entry[0])
    })
  }

  return (
    <div
      style={{
        height: '100%',
        textAlign: 'center',
        width: '100%'
      }}
    >
      {notNilOrEmpty(invoices) && (
        <PDFViewer width="96%" height="96%">
          <InvoiceTemplate invoice={invoices} />
        </PDFViewer>
      )}
    </div>
  )
}

export default Invoice
