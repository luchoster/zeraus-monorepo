export default {
  name: 'image_plug',
  title: 'Image Plug',
  type: 'object',
  fieldset: 'main',
  fields: [
    {
      name: 'condition',
      title: 'WebGL Distortioned Image?',
      type: 'boolean'
    },
    {
      name: 'main_image',
      options: {
        collapsible: true,
        collapsed: true
      },
      type: 'customImage'
    },
    {
      name: 'hovered_image',
      options: {
        collapsible: true,
        collapsed: true
      },
      type: 'customImage',
      hidden: ({ parent }) => parent && !parent.condition
    },
    {
      name: 'disp_image',
      title: 'Displayment overlay',
      options: {
        collapsible: true,
        collapsed: true
      },
      type: 'image',
      hidden: ({ parent }) => parent && !parent.condition
    }
  ]
}
