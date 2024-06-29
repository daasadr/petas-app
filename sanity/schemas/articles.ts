import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název stránky',
      type: 'string'
    }),
    defineField({
      name: 'content',
      title: 'Obsah stránky',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime'
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string'
    }),
    defineField({
      name: 'tags',
      title: 'Štítky',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'ogImage',
      title: 'Obrázek pro sociální sítě',
      type: 'image'
    })
  ]
})