import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'creation',
  title: 'Creations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'creationPages',
      title: 'Creation Pages',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'creationPage' }],
        },
      ],
    }),
  ],
});