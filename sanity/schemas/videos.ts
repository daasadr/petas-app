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
              name: 'videoFile', 
              title: 'Video soubor',
              type: 'file',
              options: {
                accept: 'video/*'
              }
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