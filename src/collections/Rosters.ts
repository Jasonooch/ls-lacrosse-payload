import type { CollectionConfig } from 'payload'

export const Rosters: CollectionConfig = {
  slug: 'roster',
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
      admin: {
        description: 'Players on this roster',
      },
      fields: [
        {
          name: 'player',
          type: 'relationship',
          relationTo: 'players',
          required: true,
          admin: {
            description: 'Select a player',
          },
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            if (data?.player && typeof data.player === 'object') {
              const jerseyNumber = data.player.jerseyNumber || '?'
              const firstName = data.player.firstName || ''
              const lastName = data.player.lastName || ''
              return `${jerseyNumber} - ${firstName} ${lastName}`.trim()
            }
            return `Player ${index + 1}`
          },
        },
      },
    },
  ],
}
