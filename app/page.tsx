import { getHomePage,  getNavigation,  testSanityConnection } from '../sanity/sanity-utils'
import CustomPortableTextComponent from '../components/CustomPortableTextComponent'
import { urlFor } from '../sanity/sanity-utils'
import styles from '../styles/HomePage.module.css';
import DynamicNavigation from '../components/DynamicNavigation';



export const revalidate = 60;

// Tuto funkci můžeme ponechat mimo komponentu, protože ji potřebujeme spustit pouze jednou
testSanityConnection();

export default async function Home(){
  try {
    console.log("Začínám načítat data");
    testSanityConnection()
    console.log("Sanita připojení otestováno");

    
    // Paralelní načítání dat pro lepší výkon
   
   
    const homePage = await getHomePage();
    const navigationItems = await getNavigation();
    
console.log("Data načtena:", { homePage });
console.log("Struktura homePage:", JSON.stringify(homePage, null, 2));

        return (
      <div className={styles.homepageContainer}>
        <div className={styles.frame}>
          <div className={styles.innerFrame}>
            <div className={styles.contentBlock + ' ' + styles.contentBlockLeft}>
              <h1 className="hStyle">{homePage.title}</h1>
              <div className='textStyle'>
              {homePage.intro && (
                <CustomPortableTextComponent  value={homePage.intro} />
              )}</div>
              
            </div>

             <div className={styles.centerStrip}></div>
          
          <div className={styles.navigation}></div>
            
            <DynamicNavigation items={navigationItems} />
            
           
            
            <div className={styles.contentBlock + ' ' + styles.contentBlockRight}>
              {/* Obsah pravého bloku */}
            </div>
          </div>
        </div>
      </div>
    )

  } catch (error: any) {
    console.error("Chyba při načítání dat:", JSON.stringify(error, null, 2));
    return <div>Došlo k chybě při načítání obsahu: {error.message || 'Neznámá chyba'}</div>
  }
}