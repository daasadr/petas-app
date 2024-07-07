import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'videoPage',
  title: 'Stránka s videi',
  type: 'document',
  fields: [
    defineField({
      name: 'videos',
      title: 'Videa',
      type: 'array',
      of: [
        {
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
        }
      ]
    })
  ]
})