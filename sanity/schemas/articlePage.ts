import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'articlePage',
  title: 'Stránka článku',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název článku',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum publikování',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativní text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Popisek obrázku',
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Úryvek',
      type: 'text',
      description: 'Krátký popis článku pro náhled (150-200 znaků)',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'content',
      title: 'Obsah článku',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Nadpis 2', value: 'h2' },
            { title: 'Nadpis 3', value: 'h3' },
            { title: 'Nadpis 4', value: 'h4' },
            { title: 'Citace', value: 'blockquote' }
          ],
          lists: [
            { title: 'Odrážky', value: 'bullet' },
            { title: 'Číslování', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Tučné', value: 'strong' },
              { title: 'Kurzíva', value: 'em' },
              { title: 'Podtržené', value: 'underline' },
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativní text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Popisek',
            },
          ],
        },
        {
          type: 'object',
          name: 'video',
          title: 'Video',
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
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tagy',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta titulek',
          description: 'Titulek pro vyhledávače (50-60 znaků)',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta popis',
          description: 'Popis pro vyhledávače (150-160 znaků)',
          validation: Rule => Rule.max(160)
        },
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, author, media } = selection
      return {
        title: title,
        subtitle: author && `od ${author}`,
        media: media
      }
    }
  }
})