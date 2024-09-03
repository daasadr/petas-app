import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Článek',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Obsah',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        {
          type: 'object',
          name: 'video',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'URL videa'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Popisek'
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publikováno',
      type: 'datetime',
    }),
  ],
})