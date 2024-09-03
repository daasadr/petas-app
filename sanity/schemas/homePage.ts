import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Hlavní stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulek',
      type: 'string'
    }),
    defineField({
      name: 'intro',
      title: 'Úvodní obsah',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'}
      ]
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    /*defineField({
  name: 'menuItems',
  title: 'Položky menu',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Název položky' },
        {
          name: 'linkType',
          type: 'string',
          title: 'Typ odkazu',
          options: {
            list: [
              { title: 'Interní odkaz', value: 'internal' },
              { title: 'Externí odkaz', value: 'external' },
            ],
          },
        },
        {
          name: 'internalLink',
          type: 'reference',
          to: [
            { type: 'page' },
            { type: 'myStory' },
            { type: 'myCreations' },
             { type: 'creationSection' },
            { type: 'videoPage' },
            { type: 'contactPage'},
            // Přidej zde další typy dokumentů podle potřeby
          ],
          title: 'Odkaz na interní stránku',
          hidden: ({ parent }) => parent?.linkType !== 'internal',
        },
        {
          name: 'externalLink',
          type: 'url',
          title: 'Externí URL',
          hidden: ({ parent }) => parent?.linkType !== 'external',
        },
      ],
    },
  ],
})*/
  ]
})