import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'myCreations',
  title: 'Moje tvorba',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulek',
      type: 'string'
    }),
    defineField({
      name: 'sections',
      title: 'Sekce',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'creationSection'}]}
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