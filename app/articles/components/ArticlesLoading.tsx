import styles from '@/styles/Articles.module.css'

export function ArticlesLoading() {
  return (
    <div className={styles.loading}>
      <div>Načítání článků...</div>
    </div>
  )
}