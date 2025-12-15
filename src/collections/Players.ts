import type { CollectionConfig } from 'payload'

export const Players: CollectionConfig = {
  slug: 'players',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    defaultColumns: ['fullName', 'jerseyNumber', 'graduationYear', 'updatedAt'],
    useAsTitle: 'fullName',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', admin: { width: '50%' } },
        { name: 'lastName', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Auto-generated from first and last name',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return `${siblingData.firstName || ''} ${siblingData.lastName || ''}`.trim()
          },
        ],
      },
    },
    {
      name: 'jerseyNumber',
      type: 'number',
      required: true,
      admin: {
        description: "Player's jersey number",
      },
      min: 0,
      max: 999,
    },
    {
      name: 'graduationYear',
      type: 'relationship',
      relationTo: 'years',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Year of graduation',
      },
    },
  ],
}
