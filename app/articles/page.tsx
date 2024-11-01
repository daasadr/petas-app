import { getArticlesPage, getArticlePreviews } from '@/sanity/sanity-utils'
import { ArticlesList } from './components/ArticleList'
import { ArticlesLoading } from './components/ArticlesLoading'
import styles from '@/styles/Grid.module.css'

export default async function Articles() {
  const page = await getArticlesPage()
  const articles = page.featuredArticles && page.featuredArticles.length > 0
    ? page.featuredArticles
    : await getArticlePreviews()

  return (
    <div className={styles.pageGrid}>
      <header className={styles.pageHeader}>
        <h1>{page.title}</h1>
        {page.description && (
          <p className={styles.pageDescription}>{page.description}</p>
        )}
      </header>
      
      <ArticlesList articles={articles} />
    </div>
  )
}