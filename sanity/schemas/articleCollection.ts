import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'articleCollection',
  title: 'article-collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název stránky',
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
      name: 'description',
      title: 'Popis stránky',
      type: 'text'
    }),
    defineField({
      name: 'articles',
      title: 'články',
      type: 'array',
      of: [
        { type: 'reference',
          to: [{type: 'article'}]

          

        }

      ]
    }),
    defineField({
      name: 'featuredArticles',
      title: 'Zvýrazněné články',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }]
        }
      ]
    }),
    defineField({
      name: 'showAllArticles',
      title: 'Zobrazit všechny články',
      type: 'boolean',
      description: 'Pokud je zaškrtnuto, zobrazí se všechny články kromě zvýrazněných'
    }),
    defineField({
      name: 'articlesPerPage',
      title: 'Počet článků na stránku',
      type: 'number',
      validation: Rule => Rule.min(1).max(50)
    })
  ]
})