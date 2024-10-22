import client from '../sanity/client'

client
  .patch('articles') // ID dokumentu, může být jiné, zkontrolujte v Sanity Studiu
  .set({
    slug: {
      _type: 'slug',
      current: 'articles'
    }
  })
  .commit()
  .then((updatedDoc) => {
    console.log('Slug byl úspěšně aktualizován:', updatedDoc)
  })
  .catch((err) => {
    console.error('Chyba při aktualizaci slugu:', err)
  })