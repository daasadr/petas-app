import { getHomePage } from '../../sanity/sanity-utils'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'
import styles from '../../styles/HomePage.module.css'
import GlowingTitle from '../../components/GlowingTitleComponent'

export const runtime = 'edge'
export const dynamic = 'force-static'

export default async function Home() {
  const homePage = await getHomePage();
  
  return (
    <div className={styles.homepageRoot}>
      <div className={styles.homepageContainer}>
        <GlowingTitle isMainHomeTitle={true} /> {/* Přidáme prop pro hlavní homepage title */}
        <div className={styles.frame}>
          <div className={styles.innerFrame}>
            <div className={styles.contentBlock + ' ' + styles.contentBlockLeft}>
              <div className={styles.intro}>
                {homePage.intro && (
                  <CustomPortableTextComponent value={homePage.intro} />
                )}
              </div>
            </div>
            <div className={styles.centerStrip}></div>
            <div className={styles.contentBlock + ' ' + styles.contentBlockRight}>
              {/* Obsah pravého bloku */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}