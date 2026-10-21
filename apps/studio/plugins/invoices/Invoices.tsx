import {useCallback, useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {Box, Card, Flex, Grid, Heading, Select, Text, Spinner} from '@sanity/ui'
import PaymentStatus from './components/updatePaymentStatus'
import GenerateInvoicePDF from './components/generateInvoicePdf'
import {SendEmail} from './components/sendEmail'

export default function InvoicesDashboard() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [loading, setLoading] = useState(true)
  const client = useClient({apiVersion: '2022-10-25'})
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const fetchInvoices = useCallback(() => {
    setLoading(true)
    const query = `*[_type == "invoices" && invoice_date >= '${currentYear}-01-01' && invoice_due_date <= '${currentYear}-12-31'] | order(invoice_number desc) {
      ...,
      "client": clients->
    }`
    client.fetch(query).then((result) => {
      setInvoices(result || [])
      setLoading(false)
    })
  }, [client, currentYear])

  const fetchTotalIncome = useCallback(() => {
    const query = `*[_type == "invoices" && invoice_date > '${currentYear}-01-01' && invoice_due_date <= '${currentYear}-12-31' && payment_status == "paid"] {
      invoiceItems
    }`
    client.fetch(query).then((result) => {
      let total = 0
      result?.forEach((inv: any) => {
        inv.invoiceItems?.forEach((item: any) => {
          total += item.price * item.quantity
        })
      })
      setTotalIncome(total)
    })
  }, [client, currentYear])

  useEffect(() => {
    fetchInvoices()
    fetchTotalIncome()
  }, [fetchInvoices, fetchTotalIncome])

  const years: number[] = []
  for (let y = 2020; y <= new Date().getFullYear(); y++) {
    years.push(y)
  }

  return (
    <Box padding={4} sizing="border" style={{height: '100%', overflow: 'auto'}}>
      {/* Header bar */}
      <Flex align="center" justify="space-between" gap={4} paddingBottom={5}>
        <Select
          fontSize={2}
          padding={3}
          value={currentYear}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrentYear(Number(e.currentTarget.value))
          }
          style={{maxWidth: 120}}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Heading size={3}>${totalIncome.toLocaleString()}</Heading>
      </Flex>

      {/* Loading */}
      {loading && (
        <Flex align="center" justify="center" padding={6}>
          <Spinner muted />
        </Flex>
      )}

      {/* Empty */}
      {!loading && invoices.length === 0 && (
        <Card padding={5} radius={2} shadow={1}>
          <Flex align="center" justify="center">
            <Text muted>No invoices found for {currentYear}</Text>
          </Flex>
        </Card>
      )}

      {/* Table */}
      {!loading && invoices.length > 0 && (
        <Box>
          {/* Column headers */}
          <Card padding={4} radius={2} shadow={1} tone="inherit">
            <Grid columns={[8]} gap={1}>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Invoice #
                </Text>
              </Flex>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Invoice Date
                </Text>
              </Flex>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Due Date
                </Text>
              </Flex>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Client Name
                </Text>
              </Flex>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Hrs / Qty
                </Text>
              </Flex>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Rate / Price
                </Text>
              </Flex>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Payment Status
                </Text>
              </Flex>
              <Flex align="center" justify="center">
                <Text size={1} weight="bold">
                  Generate Invoice
                </Text>
              </Flex>
            </Grid>
          </Card>

          {/* Rows */}
          {invoices.map((invoice: any, index: number) => {
            let totalQty = 0
            let totalDue = 0
            invoice.invoiceItems?.forEach((item: any) => {
              totalQty += item.quantity
              totalDue += item.price * item.quantity
            })

            return (
              <Card
                key={invoice._id}
                padding={4}
                radius={2}
                shadow={1}
                tone={index % 2 === 0 ? 'transparent' : 'primary'}
              >
                <Grid columns={[8]} gap={1}>
                  <Flex align="center" justify="center">
                    <Text size={1}>{invoice.invoice_number}</Text>
                  </Flex>
                  <Flex align="center" justify="center">
                    <Text size={1}>{invoice.invoice_date}</Text>
                  </Flex>
                  <Flex align="center" justify="center">
                    <Text size={1}>{invoice.invoice_due_date}</Text>
                  </Flex>
                  <Flex align="center" justify="center">
                    <Text size={1}>{invoice.client?.client_name}</Text>
                  </Flex>
                  <Flex align="center" justify="center">
                    <Text size={1}>{totalQty}</Text>
                  </Flex>
                  <Flex align="center" justify="center">
                    <Text size={1}>$ {totalDue.toLocaleString()}</Text>
                  </Flex>
                  <Flex align="center" justify="center">
                    <PaymentStatus
                      invoiceId={invoice._id}
                      paymentStatus={invoice.payment_status}
                    />
                  </Flex>
                  <Flex align="center" justify="center" gap={2}>
                    <GenerateInvoicePDF invoice={invoice} />
                    <SendEmail invoice={invoice} />
                  </Flex>
                </Grid>
              </Card>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
