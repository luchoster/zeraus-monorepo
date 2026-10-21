import { Resend } from 'resend'

export const config = {
  runtime: 'edge',
}

const resend = new Resend(process.env.RESEND_API_KEY)

const handler = async (req: Request): Promise<Response> => {
  const { file, subject, html, recipient } = await req.json()

  console.log(file)

  try {
    const data = await resend.emails.send({
      from: 'Lucho Suarez <lucho@emails.zera.us>',
      to: recipient,
      subject,
      html,
      text: 'it works!',
      // attachments: [
      //   {
      //     filename: 'invoice.pdf',
      //     content: file,
      //   },
      // ],
      headers: {
        'X-Entity-Ref-ID': '123456789',
      },
      tags: [
        {
          name: 'category',
          value: 'invoices',
        },
      ],
    })

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.log('error: ', error)
    return new Response(JSON.stringify(error), { status: 400 })
  }
}

export default handler
