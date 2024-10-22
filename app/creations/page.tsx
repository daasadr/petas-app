
import Image from 'next/image'
import Link from 'next/link'
import { getCreations } from '@/sanity/sanity-utils'
import { Creations } from '@/types/types'

export default async function CreationsPage() {
  const creations: Creations | null = await getCreations()

  console.log('Creations:', JSON.stringify(creations, null, 2))

  if (!creations) {
    return <div>Načítání dat se nezdařilo.</div>
  }
  console.log('Creations pages:', creations.pages)
  
  return (
    <div>
      <h1>{creations.title || 'Moje tvorba'}</h1>
      {creations.pages && creations.pages.length > 0 ? (
        creations.pages.map((page) => (
          <article key={page._id}>
            <h2>{page.title}</h2>
            {page.ogImage && (
              <Image
                src={page.ogImage}
                alt={page.title}
                width={500}
                height={300}
              />
            )}
            <p>{page.excerpt}</p>
            <Link href={`/creations/${page.slug}`}>
              Přejít na článek
            </Link>
          </article>
        ))
      ) : (
        <p>Žádné články k zobrazení.</p>
      )}
    </div>
  )
}