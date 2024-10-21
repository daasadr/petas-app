import { getArticles } from '../../sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { Article } from '@/types/types'
import styles from '@/styles/Articles.module.css'

export default async function ArticlesPage() {
  const articles: Article[] = await getArticles()

  return (
    <div>
      <h1>Články</h1>
      {articles.map((article: Article) => (
        <article key={article._id}>
          <h2>{article.title}</h2>
          <PortableText
            value={article.content}
            components={{
              types: {
                image : ({ value }: {value: any}) => (
                  <Image className={styles.centredImage}
                    src={value.url}
                    alt={value.alt || ' '}
                    width={500}
                    height={300}
                  />
                ),
                video: ({ value }: {value: any}) => (
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