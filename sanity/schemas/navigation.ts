import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigace',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název položky',
      type: 'string'
    }),
    defineField({
      name: 'linkType',
      title: 'Typ odkazu',
      type: 'string',
      options: {
        list: [
            {title: 'Internní', value: 'internal'},
            {title: 'Externí', value: 'external'}
        ]
      }
    }),
    defineField({
        name: 'internalLink',
        title: 'Interní odkaz',
        type: 'reference',
        to: [
            {type: 'articleCollection'},
            {type: 'myStory'},
            {type: 'myCreations'},
            {type: 'videoPage'},
            {type: 'contactPage'}
        ],
        hidden: ({document}) => document?.linkType !== 'internal'
    }),
    defineField({
        name: 'externalLink',
        title: 'Externí odkaz',
        type: 'url',
        hidden: ({document}) => document?.linkType !== 'external'
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number'
    })
  ]
})