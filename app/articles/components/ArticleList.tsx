import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Grid.module.css'
import { Article } from '@/types/types'

interface ArticlesListProps {
  articles: Article[];
}

export function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <div className={styles.gridList}>
      {articles.map((article) => (
        <article key={article._id} className={styles.gridCard}>
          {article.ogImage && (
            <div className={styles.cardImage}>
              <Image
                src={article.ogImage}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          )}
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{article.title}</h2>
            {article.excerpt && (
              <p className={styles.cardExcerpt}>{article.excerpt}</p>
            )}
            <Link 
              href={`/articles/${article.slug}`}
              className={styles.cardLink}
            >
              Přejít na článek
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}