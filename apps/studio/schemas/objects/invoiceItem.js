export default {
  name: 'invoiceItem',
  title: 'Invoice Item',
  type: 'object',
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    columns: 1, // Defines a grid for the fields and how many columns it should have
  },
  fields: [
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'quantity',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
      validation: Rule => [
        Rule.positive().error('Make sure this is a positive number'),
        Rule.precision(2).warning('2 decimals max'),
      ],
    },
  ],
  preview: {
    select: {
      title: 'description',
      quantity: 'quantity',
      price: 'price',
    },
    prepare(selection) {
      const { title, quantity, price } = selection
      return {
        title: title,
        subtitle: `Hours: ${quantity} | Due: $ ${quantity * price}`,
      }
    },
  },
}
