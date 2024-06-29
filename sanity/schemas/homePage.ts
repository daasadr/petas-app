import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Hlavní stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulek',
      type: 'string'
    }),
    defineField({
      name: 'intro',
      title: 'Úvodní obsah',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'}
      ]
    }),
    defineField({
      name: 'menuItems',
      title: 'Položky menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Název položky'},
            {name: 'link', type: 'reference', to: [{type: 'page'}], title: 'Odkaz na stránku'}
          ]
        }
      ]
    })
  ]
})