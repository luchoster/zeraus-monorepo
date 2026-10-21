// import ImageWebgl from '../components/ImageWebgl'

export default {
  name: "imageComponent",
  title: "Image Component",
  type: "document",
  // inputComponent: ImageWebgl,
  fieldsets: [
    {
      name: "images",
      title: "Images",
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    {
      name: "condition",
      title: "WebGL Image?",
      type: "boolean",
    },
    {
      name: "main_image",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldset: "images",
      type: "customImage",
    },
    {
      name: "hovered_image",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldset: "images",
      type: "customImage",
      description: "Image to be displayed when hovered",
      hidden: ({ parent }) => parent && !parent.condition,
    },
    {
      name: "disp_image",
      title: "Displayment overlay",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldset: "images",
      type: "image",
      hidden: ({ parent }) => parent && !parent.condition,
    },
  ],
};
