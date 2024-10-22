import { defineType, defineField } from 'sanity'


export default defineType({
  name: 'articles',
  title: 'articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název stránky',
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
      name: 'description',
      title: 'Popis',
      type: 'text',
      description: 'Krátký popis obsahu stránky'
    }),
    defineField({
      name: 'articlesPerPage',
      title: 'Počet článků na stránku',
      type: 'number',
      initialValue: 10,
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'featuredArticles',
      title: 'Vybrané články',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'articlePage' }]
        }
      ]
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
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta popis',
          validation: Rule => Rule.max(160)
        }
      ]
    })
  ]
})