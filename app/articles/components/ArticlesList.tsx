import { ArticlePreview } from './ArticlePreview'
import styles from '@/styles/Articles.module.css'

export function ArticlesList({ articles }: { articles: any[] }) {
  return (
    <div className={styles.articlesContainer}>
      {articles.map((article) => (
        <ArticlePreview key={article._id} article={article} />
      ))}
    </div>
  )
}