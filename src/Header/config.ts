import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Website Title',
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      label: 'Logo',
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      label: 'Max Logo Height',
      name: 'maxHeight',
      type: 'number',
      defaultValue: 32,
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6, // max allowed links in header
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
