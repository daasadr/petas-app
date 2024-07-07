import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'myStory',
  title: 'Můj příběh',
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
      name: 'photoUrl',
      title: 'Fotografie',
      type: 'image'
    })
  ]
})