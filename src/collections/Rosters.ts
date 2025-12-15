import type { CollectionConfig } from 'payload'

export const Rosters: CollectionConfig = {
  slug: 'rosters',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    defaultColumns: ['season', 'updatedAt'],
    useAsTitle: 'season',
  },
  fields: [
    {
      name: 'season',
      type: 'text',
      required: true,
      admin: {
        description: 'Season year (e.g., "2024-2025")',
      },
    },
    {
      name: 'players',
      type: 'array',
      required: false,
      label: 'Players',
      admin: {
        description: 'Players on this roster',
      },
      fields: [
        {
          name: 'player',
          type: 'relationship',
          relationTo: 'players',
          required: true,
          label: 'Player',
        },
      ],
    },
  ],
}
