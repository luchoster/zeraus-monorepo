export default {
  name: 'clients',
  title: 'Clients',
  type: 'document',
  fieldsets: [
    {
      name: 'client',
      title: 'Client',
      options: {
        collapsible: false, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 1 // Defines a grid for the fields and how many columns it should have
      }
    }
  ],
  fields: [
    {
      name: 'client_name',
      title: 'Company Name',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_contact',
      title: 'Contact Name',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_phone',
      title: 'Phone Number',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_email',
      title: 'Email Address',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_address_1',
      title: 'Address 1',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_address_2',
      title: 'Address 2',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_city',
      title: 'City',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_state',
      title: 'State',
      type: 'string',
      fieldset: 'client'
    },
    {
      name: 'client_zip',
      title: 'Zipcode',
      type: 'string',
      fieldset: 'client'
    }
  ]
}
