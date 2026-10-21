export default {
  name: 'main_menu',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'menuPages'
        }
      ]
      // of: [{ type: 'reference', to: [{ type: 'page' }] }],
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Main Menu'
      }
    }
  }
}
