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
        {type: 'image'}
      ]
    }),
    defineField({
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text'
    }
  ]
})


  ]
})