import { HiOutlinePhoto } from 'react-icons/hi2'

export default {
  name: 'customImage',
  type: 'image',
  title: 'Image',
  icon: HiOutlinePhoto,
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility.',
      validation: Rule =>
        Rule.error('You have to fill out the alternative text.').required(),
    },
    {
      name: 'class',
      title: 'CSS Class',
      type: 'string',
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
