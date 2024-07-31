import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'myStory',
  title: 'my-story',
  type: 'document', 
  fields: [
    defineField({
      name: 'title',
      title: 'Titulek',
      type: 'string'
    }),
    defineField({
      name: 'content',
      title: 'Obsah',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'}
      ]
    }),
    defineField({
      name: 'imageUrl',
      title: 'Fotografie',
      type: 'image'
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