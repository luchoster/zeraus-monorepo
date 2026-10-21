import {documentEventHandler} from '@sanity/functions'
import {createClient} from '@sanity/client'
import {Resend} from 'resend'

export const handler = documentEventHandler(async ({context, event}) => {
  const {data} = event

  if (!data?.email_request) {
    console.log('No email_request found, skipping.')
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY environment variable is not set.')
    return
  }

  const resend = new Resend(apiKey)
  const client = createClient({
    ...context.clientOptions,
    apiVersion: '2025-01-01',
  })

  const {to, pdf_base64, filename, requested_at} = data.email_request

  console.log(`Sending invoice #${data.invoice_number} to ${to} (requested at ${requested_at})`)

  try {
    const result = await resend.emails.send({
      from: 'Warren Burrows <invoices@emails.warrenburrows.com>',
      to: [to],
      subject: `Invoice #${data.invoice_number} from Warren Burrows`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #46515B;">Invoice #${data.invoice_number}</h2>
          <p>Please find your invoice attached.</p>
          <p style="margin-top: 24px; color: #666;">
            Warren Burrows<br/>
            7265 Dean Martin Dr. #100<br/>
            Las Vegas, NV 89118<br/>
            (702) 350-1098
          </p>
        </div>
      `,
      attachments: pdf_base64
        ? [
            {
              filename: filename || `invoice-${data.invoice_number}.pdf`,
              content: pdf_base64,
            },
          ]
        : undefined,
    })

    console.log('Email sent successfully:', result)

    // Clear email_request and record that the email was sent
    await client
      .patch(data._id)
      .set({
        email_sent: {
          to,
          sent_at: new Date().toISOString(),
        },
      })
      .unset(['email_request'])
      .commit()

    console.log('Cleared email_request and set email_sent on document', data._id)
  } catch (err) {
    console.error('Failed to send email:', err)
  }
})
