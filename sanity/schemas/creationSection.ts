import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'creationSection',
  title: 'Sekce tvorby',
  type: 'document', // Změnili jsme typ na 'document'
  
  fields: [
    defineField({
      name: 'title',
      title: 'Titulek sekce',
      type: 'string'
    }),
    defineField({
      name: 'content',
      title: 'Obsah',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
        
      ]
    }),
    defineField({
      name: 'video',
      title: 'video produktu',
      type: 'object',
       fields: [
            {
              name: 'videoType',
              title: 'Typ videa',
              type: 'string',
              options: {
                list: [
                  {title: 'YouTube video', value: 'youtube'},
                  {title: 'Nahraný soubor', value: 'file'}
                ],
                layout: 'radio'
              }
            },
            {
              name: 'youtubeVideoId',
              title: 'YouTube Video ID',
              type: 'string',
              hidden: ({parent}) => parent?.videoType !== 'youtube'
            },
            {
              name: 'videoFile',
              title: 'Video soubor',
              type: 'file',
              options: {
                accept: 'video/*'
              },
              hidden: ({parent}) => parent?.videoType !== 'file'
            },
            {
              name: 'caption',
              title: 'Popisek k videu',
              type: 'string'
            }
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


  ]
})