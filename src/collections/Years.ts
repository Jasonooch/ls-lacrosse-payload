import type { CollectionConfig } from 'payload'

export const Years: CollectionConfig = {
  slug: 'years',
  admin: {
    useAsTitle: 'year',
  },
  fields: [
    {
      name: 'year',
      label: 'Year',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
