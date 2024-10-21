import { getHomePage } from '../sanity/sanity-utils'
import CustomPortableTextComponent from '../components/CustomPortableTextComponent'
import styles from '../styles/HomePage.module.css';

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <div className={styles.homepageContainer}>
          <div className={styles.frame}>
            <div className={styles.innerFrame}>
              <div className={styles.contentBlock + ' ' + styles.contentBlockLeft}>
                <h1 className={styles.title}>{homePage.title}</h1>
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
    )
  }
   
   
