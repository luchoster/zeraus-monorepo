import {useState} from 'react'
import {Select} from '@sanity/ui'
import {useClient} from 'sanity'

interface Props {
  invoiceId: string
  paymentStatus: string
}

export default function PaymentStatus({invoiceId, paymentStatus}: Props) {
  const [status, setStatus] = useState(paymentStatus)
  const client = useClient({apiVersion: '2021-03-25'})

  async function update(val: string) {
    setStatus(val)
    await client.patch(invoiceId).set({payment_status: val}).commit()
  }

  return (
    <Select
      fontSize={1}
      value={status}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update(e.currentTarget.value)}
      disabled={status === 'paid'}
    >
      <option value="unpaid">Unpaid</option>
      <option value="paid">Paid</option>
      <option value="partially">Partial</option>
    </Select>
  )
}
