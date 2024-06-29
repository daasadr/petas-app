import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Kontaktní stránka',
  type: 'document', 
  fields: [
    defineField({
      name: 'contactInfo',
      title: 'Kontaktní informace',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'contactFormHeading',
      title: 'Nadpis kontaktního formuláře',
      type: 'string'
    }),
    defineField({
      name: 'contactFormPrompt',
      title: 'Text prosby o kontakt',
      type: 'string'
    }),
    defineField({
      name: 'contactFormFields',
      title: 'Pole kontaktního formuláře',
      type: 'array',
      of: [
        {type: 'object', 
         fields: [
           {name: 'label', title: 'Označení pole', type: 'string'},
           {name: 'id', title: 'Unikátní ID', type: 'string'},
           {name: 'type', title: 'Typ vstupu', type: 'string', options: {list: ['text', 'email']}}
         ]
        }
      ]
    })
  ]
})