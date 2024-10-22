import styles from '@/styles/Articles.module.css'

export function ImageLoading() {
  return (
    <div className={styles.imageLoading}>
      <div>Načítání obrázku...</div>
    </div>
  )
}