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
<<<<<<< HEAD
      name: 'image',
      title: 'FHlavní obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
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
=======
      name: 'photoUrl',
      title: 'Fotografie',
      type: 'image'
    })
>>>>>>> f9009f35321543bf6e84586dbc5c535235155826
  ]
})