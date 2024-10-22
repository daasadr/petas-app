import { getArticlesPage, getArticlePreviews } from '@/sanity/sanity-utils'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { ArticlesList } from './components/ArticlesList'
import { ArticlesLoading } from './components/ArticlesLoading'
import styles from '@/styles/Articles.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getArticlesPage()
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.description
  }
}

export default async function Articles() {
  const page = await getArticlesPage()
  const articles = page.featuredArticles && page.featuredArticles.length > 0
    ? page.featuredArticles
    : await getArticlePreviews()

  return (
    <div className={styles.articlesGrid}>
      <header className={styles.pageHeader}>
        <h1>{page.title}</h1>
        {page.description && (
          <p className={styles.pageDescription}>{page.description}</p>
        )}
      </header>

      <Suspense fallback={<ArticlesLoading />}>
        <ArticlesList articles={articles} />
      </Suspense>
    </div>
  )
}