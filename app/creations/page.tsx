import { getCreations } from '../../sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { Creation } from '@/types/types'

export default async function CreationPage() {
  const creations: Creation[] = await getCreations()

  return (
    <div>
      <h1>Moje tvorba</h1>
      {creations.map((creation: Creation) => (
        <article key={creation._id}>
          <h2>{creation.title}</h2>
          <PortableText
            value={creation.content}
            components={{
              types: {
                image: ({ value }) => (
                  <Image
                    src={value.url}
                    alt={value.alt || ' '}
                    width={500}
                    height={300}
                  />
                ),
                video: ({ value }) => (
                  <div>
                    <iframe
                      width="560"
                      height="315"
                      src={value.url}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                    {value.caption && <p>{value.caption}</p>}
                  </div>
                ),
              },
            }}
          />
        </article>
      ))}
    </div>
  )
}