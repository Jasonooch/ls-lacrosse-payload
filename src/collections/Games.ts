import type { CollectionConfig } from 'payload'

export const Games: CollectionConfig = {
  slug: 'games',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    defaultColumns: ['name', 'opponent', 'date', 'gameType', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Game Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Game name (e.g., "vs Boston College")',
              },
            },
            {
              name: 'opponent',
              type: 'relationship',
              relationTo: 'opponents',
              required: true,
            },
            {
              name: 'season',
              type: 'relationship',
              relationTo: 'years',
              required: true,
            },
            {
              name: 'date',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'location',
              type: 'text',
              required: false,
              admin: {
                description: 'Game location/venue',
              },
            },
            {
              name: 'livestreamLink',
              type: 'text',
              required: false,
              admin: {
                description: 'URL to livestream',
              },
            },
            {
              name: 'gameType',
              type: 'select',
              required: true,
              defaultValue: 'regular-season',
              options: [
                {
                  label: 'Scrimmage',
                  value: 'scrimmage',
                },
                {
                  label: 'Regular Season',
                  value: 'regular-season',
                },
                {
                  label: 'Playoffs',
                  value: 'playoffs',
                },
              ],
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'lsFinal',
                  label: 'LS Final Score',
                  type: 'number',
                  required: false,
                  min: 0,
                  admin: {
                    width: '50%',
                    description: 'Final score for LS',
                  },
                },
                {
                  name: 'opponentFinal',
                  label: 'Opponent Final Score',
                  type: 'number',
                  required: false,
                  min: 0,
                  admin: {
                    width: '50%',
                    description: 'Final score for opponent',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
