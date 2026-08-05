import { authenticated } from '@/access/authenticated'
import LABELS from '@/LABELS'
import { CollectionConfig } from 'payload'
import { expenseCategoriesArray } from './Expenses/_types/expenseCategories'

const ExpenseTags: CollectionConfig = {
  slug: 'expenseTags',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: LABELS.personal,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: expenseCategoriesArray,
      hasMany: true,
    },
    {
      name: 'count',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Counts how many times this tag has been used, to sort by usage.',
      }
    }
  ],
}

export default ExpenseTags
