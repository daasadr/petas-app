import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Článek',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název článku',
      type: 'string'
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
    defineField({
      name: 'content',
      title: 'Obsah článku',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    }),
    defineField({
      name: 'excerpt',
      title: 'Krátký popis',
      type: 'text',
      description: 'Krátký popis článku pro náhled'
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
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ]
})