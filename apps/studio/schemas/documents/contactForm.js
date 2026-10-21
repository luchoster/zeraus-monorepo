export default {
  name: 'contactForm',
  type: 'document',
  title: 'Form submissions',
  readOnly: true,
  __experimental_actions: [/*'create',*/ /*'update',*/ 'delete' /*'publish'*/],
  fields: [
    {
      name: 'contactFormData',
      type: 'contactFormData'
    }
  ],
  preview: {
    select: {
      title: 'contactFormData.name',
      subtitle: 'contactFormData.email'
    }
  }
}
