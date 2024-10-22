import { getArticleBySlug } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import styles from '@/styles/Articles.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const slug = await Promise.resolve(params.slug)
  const article = await getArticleBySlug(slug)
  
  if (!article) return {}
  
  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt
  }
}

export default async function ArticlePage(props: Props) {
  const params = await props.params
  const slug = await Promise.resolve(params.slug)
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }


  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1>{article.title}</h1>
        <div className={styles.metadata}>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}
          </time>
          <span className={styles.author}>Autor: {article.author}</span>
        </div>
      </header>

      {article.mainImage && (
        <figure className={styles.mainImage}>
          <Image
            src={article.mainImage.asset.url}
            alt={article.mainImage.alt || ''}
            width={1200}
            height={675}
            className={styles.image}
          />
          {article.mainImage.caption && (
            <figcaption>{article.mainImage.caption}</figcaption>
          )}
        </figure>
      )}

      <div className={styles.content}>
        <PortableText
          value={article.content}
          components={{
            types: {
              image: ({value}) => (
                <figure className={styles.contentImage}>
                  <Image
                    src={value.url}
                    alt={value.alt || ''}
                    width={800}
                    height={450}
                    className={styles.image}
                  />
                  {value.caption && (
                    <figcaption>{value.caption}</figcaption>
                  )}
                </figure>
              ),
              video: ({value}) => (
                <figure className={styles.videoWrapper}>
                  <iframe
                    src={value.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {value.caption && (
                    <figcaption>{value.caption}</figcaption>
                  )}
                </figure>
              ),
            },
          }}
        />
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className={styles.tags}>
          {article.tags.map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}