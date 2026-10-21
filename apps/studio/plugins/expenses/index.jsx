import React from 'react'
import Expenses from './Expenses'

import { FileTextIcon } from '@modulz/radix-icons'

const Icon = () => <FileTextIcon />
const title = 'Expenses'
const name = 'expenses'

export default {
  title,
  name,
  tools: (prev) => {
    return [
      ...prev,
      {
        name,
        title,
        icon: Icon,
        component: () => <Expenses />,
      },
    ]
  },
}
