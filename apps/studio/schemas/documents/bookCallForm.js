export default {
  name: 'bookCallForm',
  type: 'document',
  title: 'Form submissions',
  readOnly: true,
  __experimental_actions: [/*'create',*/ /*'update',*/ 'delete' /*'publish'*/],
  fields: [
    {
      name: 'bookCallFormData',
      type: 'bookCallFormData'
    }
  ],
  preview: {
    select: {
      title: 'bookCallFormData.name',
      subtitle: 'bookCallFormData.email'
    }
  }
}
