import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";

export default {
  name: "invoices",
  title: "Invoices",
  type: "document",
  icon: FaFileInvoiceDollar,
  fieldsets: [
    {
      name: "client",
      title: "Client",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    {
      name: "invoice_number",
      type: "number",
    },
    {
      name: "invoice_date",
      title: "Invoice Date",
      type: "date",
    },
    {
      name: "invoice_due_date",
      title: "Due Date",
      type: "date",
    },
    {
      name: "payment_status",
      type: "string",
      options: {
        list: [
          { title: "Unpaid", value: "unpaid" },
          { title: "Partially paid", value: "partially" },
          { title: "Paid", value: "paid" },
        ], // <-- predefined values
        layout: "radio", // <-- defaults to 'dropdown'
      },
      initialValue: "unpaid",
    },
    {
      name: "clients",
      type: "reference",
      to: { type: "clients" },
    },
    {
      name: "invoiceItems",
      type: "array",
      of: [{ name: "invoiceItem", type: "invoiceItem" }],
    },
    {
      name: "tax",
      title: "Tax",
      type: "number",
    },
    {
      name: "notes",
      type: "text",
    },
    {
      name: "email_request",
      title: "Email Request",
      type: "object",
      hidden: true,
      fields: [
        {name: "to", type: "string"},
        {name: "pdf_base64", type: "text"},
        {name: "filename", type: "string"},
        {name: "requested_at", type: "datetime"},
      ],
    },
    {
      name: "email_sent",
      title: "Email Sent",
      type: "object",
      hidden: true,
      fields: [
        {name: "to", type: "string"},
        {name: "sent_at", type: "datetime"},
      ],
    },
  ],
  initialValue: async (value, context) => {
    return {
      invoice_number: await context.getClient({ apiVersion: "2021-03-25" }).fetch(
        `*[_type == 'invoices'] | order(invoice_number desc)[0].invoice_number + 1`
      ),
      payment_status: "unpaid",
    };
  },
  preview: {
    select: {
      name: "clients.client_name",
      invoice_number: "invoice_number",
      payment_status: "payment_status",
    },
    prepare(selection) {
      return {
        title: selection.name,
        subtitle: `Payment Status: ${selection.payment_status}`,
        media: (
          <h6
            style={{
              margin: 0,
              fontSize: 12,
            }}
          >
            {selection.invoice_number}
          </h6>
        ),
      };
    },
  },
  orderings: [
    {
      title: "By Invoice #",
      name: "sortDesc",
      by: [{ field: "invoice_number", direction: "desc" }],
    },
  ],
};
