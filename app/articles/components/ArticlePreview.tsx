import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { ImageLoading } from './ImageLoading'
import styles from '@/styles/Articles.module.css'

export function ArticlePreview({ article }: { article: any }) {
  return (
    <article className={styles.articlePreview}>
      {article.mainImage && (
        <Suspense fallback={<ImageLoading />}>
          <Image
            src={article.mainImage.url}
            alt={article.mainImage.alt || ''}
            width={400}
            height={250}
            className={styles.previewImage}
          />
        </Suspense>
      )}
      <div className={styles.previewContent}>
        <h2>{article.title}</h2>
        <div className={styles.metadata}>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}
          </time>
          <span className={styles.author}>{article.author}</span>
        </div>
        {article.excerpt && (
          <p className={styles.excerpt}>{article.excerpt}</p>
        )}
        <Link
          href={`/articles/${article.slug.current}`}
          className={styles.readMoreLink}
        >
          Přejít na článek...
        </Link>
      </div>
    </article>
  )
}