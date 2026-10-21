import {useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Button,
  Spinner,
  Badge,
} from '@sanity/ui'
import {Download, Mail} from 'lucide-react'
import {PDFDownloadLink} from '@react-pdf/renderer'
import InvoiceTemplate from './invoiceTemplate'
import {SendEmail} from './sendEmail'

interface Props {
  document: {
    displayed: any
  }
}

export default function InvoicePreview({document: {displayed}}: Props) {
  const client = useClient({apiVersion: '2022-10-25'})
  const [invoice, setInvoice] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pdfReady, setPdfReady] = useState(false)

  useEffect(() => {
    if (!displayed?._id) return
    setLoading(true)

    const docId = displayed._id.replace('drafts.', '')
    client
      .fetch(
        `*[_id == $id || _id == $draftId][0]{
          ...,
          "client": clients->
        }`,
        {id: docId, draftId: `drafts.${docId}`},
      )
      .then((result) => {
        setInvoice(result)
        setLoading(false)
      })
  }, [displayed?._id, displayed?._rev])

  if (loading) {
    return (
      <Flex align="center" justify="center" padding={6}>
        <Spinner muted />
      </Flex>
    )
  }

  if (!invoice) {
    return (
      <Box padding={5}>
        <Text muted>No invoice data found. Save the document first.</Text>
      </Box>
    )
  }

  let subTotal = 0
  if (invoice.invoiceItems) {
    invoice.invoiceItems.forEach((item: any) => {
      subTotal += item.price * item.quantity
    })
  }
  const tax = invoice.tax ?? 0
  const total = subTotal - tax

  const statusTone =
    invoice.payment_status === 'paid'
      ? 'positive'
      : invoice.payment_status === 'partially'
        ? 'caution'
        : 'critical'

  const clientName = invoice.client?.client_name
    ? invoice.client.client_name.toLowerCase().split(' ').join('-')
    : 'invoice'
  const fileName = `${invoice.invoice_number}-${clientName}.pdf`

  return (
    <Box padding={4} sizing="border">
      <Stack space={5}>
        {/* Action Bar */}
        <Card padding={4} radius={3} shadow={1}>
          <Flex align="center" justify="space-between" gap={3}>
            <Flex align="center" gap={3}>
              <Heading size={2}>Invoice #{invoice.invoice_number}</Heading>
              <Badge tone={statusTone}>{invoice.payment_status}</Badge>
            </Flex>
            <Flex gap={2}>
              {!pdfReady ? (
                <Button
                  fontSize={1}
                  tone="primary"
                  icon={Download}
                  text="Generate PDF"
                  onClick={() => setPdfReady(true)}
                />
              ) : (
                <PDFDownloadLink
                  document={<InvoiceTemplate invoice={invoice} />}
                  fileName={fileName}
                >
                  {({loading: pdfLoading}) =>
                    pdfLoading ? (
                      <Button fontSize={1} tone="primary" disabled>
                        <Spinner />
                      </Button>
                    ) : (
                      <Button fontSize={1} tone="positive" icon={Download} text="Download PDF" />
                    )
                  }
                </PDFDownloadLink>
              )}
              <SendEmail invoice={invoice} />
            </Flex>
          </Flex>
        </Card>

        {/* Invoice Preview Card */}
        <Card padding={5} radius={3} shadow={1} style={{maxWidth: 800, margin: '0 auto', width: '100%'}}>
          <Stack space={5}>
            {/* Header */}
            <Flex justify="space-between" align="flex-start">
              <Box>
                <Text size={1} weight="bold" style={{letterSpacing: '0.05em'}}>
                  WARREN BURROWS
                </Text>
              </Box>
              <Heading size={4} style={{color: '#46515B'}}>
                INVOICE
              </Heading>
            </Flex>

            {/* Client + Meta */}
            <Flex justify="space-between" align="flex-start" gap={4}>
              <Stack space={2}>
                <Text size={0} muted>
                  Invoice to :
                </Text>
                {invoice.client?.client_name && (
                  <Text size={3} weight="bold" style={{textTransform: 'uppercase'}}>
                    {invoice.client.client_name}
                  </Text>
                )}
                {invoice.client?.client_contact && (
                  <Text size={1} muted>
                    {invoice.client.client_contact}
                  </Text>
                )}
                {invoice.client?.client_phone && (
                  <Text size={1} muted>
                    {invoice.client.client_phone}
                  </Text>
                )}
                {invoice.client?.client_email && (
                  <Text size={1} muted>
                    {invoice.client.client_email}
                  </Text>
                )}
              </Stack>

              <Stack space={2} style={{textAlign: 'right'}}>
                <Text size={1}>Invoice No : {invoice.invoice_number}</Text>
                <Text size={1}>Date : {invoice.invoice_date}</Text>
                <Card
                  padding={3}
                  radius={2}
                  style={{backgroundColor: '#46515B', marginTop: 8}}
                >
                  <Text size={3} weight="bold" style={{color: '#fff', textAlign: 'center'}}>
                    DUE : {total.toLocaleString()}
                  </Text>
                </Card>
              </Stack>
            </Flex>

            {/* Table */}
            <Stack space={0}>
              <Card padding={3} radius={1} style={{backgroundColor: '#46515B'}}>
                <Grid columns={[4, 4, 4]} gap={2}>
                  <Box style={{flex: 3}}>
                    <Text size={1} weight="bold" style={{color: '#fff'}}>
                      Description
                    </Text>
                  </Box>
                  <Box style={{textAlign: 'center'}}>
                    <Text size={1} weight="bold" style={{color: '#fff'}}>
                      Qty
                    </Text>
                  </Box>
                  <Box style={{textAlign: 'center'}}>
                    <Text size={1} weight="bold" style={{color: '#fff'}}>
                      Price
                    </Text>
                  </Box>
                  <Box style={{textAlign: 'right'}}>
                    <Text size={1} weight="bold" style={{color: '#fff'}}>
                      Total
                    </Text>
                  </Box>
                </Grid>
              </Card>

              {invoice.invoiceItems?.map((item: any, i: number) => (
                <Card
                  key={item._key || i}
                  padding={3}
                  style={{borderBottom: '1px solid #e5e7eb'}}
                >
                  <Grid columns={[4, 4, 4]} gap={2}>
                    <Box style={{flex: 3}}>
                      <Text size={1}>{item.description}</Text>
                    </Box>
                    <Box style={{textAlign: 'center'}}>
                      <Text size={1}>{item.quantity}</Text>
                    </Box>
                    <Box style={{textAlign: 'center'}}>
                      <Text size={1}>${item.price?.toLocaleString()}</Text>
                    </Box>
                    <Box style={{textAlign: 'right'}}>
                      <Text size={1}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </Text>
                    </Box>
                  </Grid>
                </Card>
              ))}
            </Stack>

            {/* Footer: Company Info + Totals */}
            <Box style={{borderTop: '2px solid #46515B', paddingTop: 16}}>
              <Flex justify="space-between" align="flex-end" gap={4}>
                <Stack space={2}>
                  <Text size={1} weight="bold">
                    Warren Burrows
                  </Text>
                  <Text size={1} muted>
                    7265 Dean Martin Dr. #100
                  </Text>
                  <Text size={1} muted>
                    Las Vegas, NV 89118
                  </Text>
                  <Text size={1} muted style={{marginTop: 4}}>
                    (702) 350-1098
                  </Text>
                </Stack>

                <Stack space={2} style={{minWidth: 200}}>
                  <Flex justify="space-between">
                    <Text size={1} muted>
                      Sub-total :
                    </Text>
                    <Text size={1}>${subTotal.toLocaleString()}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text size={1} muted>
                      Tax :
                    </Text>
                    <Text size={1}>${tax.toLocaleString()}</Text>
                  </Flex>
                  <Card
                    padding={2}
                    radius={2}
                    style={{backgroundColor: '#46515B'}}
                  >
                    <Flex justify="space-between">
                      <Text size={2} weight="bold" style={{color: '#e15d55'}}>
                        Total :
                      </Text>
                      <Text size={2} weight="bold" style={{color: '#fff'}}>
                        ${total.toLocaleString()}
                      </Text>
                    </Flex>
                  </Card>
                </Stack>
              </Flex>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}
