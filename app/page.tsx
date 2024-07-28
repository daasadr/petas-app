import { getHomePage,  testSanityConnection } from '../sanity/sanity-utils'
import CustomPortableTextComponent from '../components/CustomPortableTextComponent'
import { urlFor } from '../sanity/sanity-utils'


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
      
    
console.log("Data načtena:", { homePage });
console.log("Struktura homePage:", JSON.stringify(homePage, null, 2));

    return (
      
      <div>
      <h1>{homePage.title}</h1>
      {homePage.intro && (
        <>
          <CustomPortableTextComponent value={homePage.intro} />
          {homePage.intro[2] && homePage.intro[2]._type === 'image' && (
            <img 
              src={urlFor(homePage.intro[2]).width(800).url()} 
              alt="Úvodní obrázek"
            />
          )}
        </>
      )}
          
        
        


 

       

      </div>
    )
    
  } catch (error: any) { 
    console.error("Chyba při načítání dat:", JSON.stringify(error, null, 2));
    return <div>Došlo k chybě při načítání obsahu: {error.message || 'Neznámá chyba'}</div>
  }
}
console.log("Wunderbar")