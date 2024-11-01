import Image from 'next/image'
import Link from 'next/link'
import { getCreations } from '@/sanity/sanity-utils'
import styles from '@/styles/Grid.module.css'

interface CreationPage {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  ogImage?: string;
}

interface Creations {
  title?: string;
  pages?: CreationPage[];
}

export default async function CreationsPage() {
  const creations: Creations | null = await getCreations()

  if (!creations) {
    return <div>Načítání dat se nezdařilo.</div>
  }

  return (
    <div className={styles.pageGrid}>
      <header className={styles.pageHeader}>
        <h1>{creations.title || 'Moje tvorba'}</h1>
      </header>
      
      <div className={styles.gridList}>
        {creations.pages?.map((page) => (
          <article key={page._id} className={styles.gridCard}>
            {page.ogImage && (
              <div className={styles.cardImage}>
                <Image
                  src={page.ogImage}
                  alt={page.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            )}
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{page.title}</h2>
              {page.excerpt && (
                <p className={styles.cardExcerpt}>{page.excerpt}</p>
              )}
              <Link href={`/creations/${page.slug}`} className={styles.cardLink}>
                Přejít na článek
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}