import { getHomePage, getMyCreations, getMyStory, testSanityConnection } from '../sanity/sanity-utils'
import CustomPortableTextComponent from '../components/CustomPortableTextComponent'
import { HomePage, MyStory } from '../types/types'

// Tuto funkci můžeme ponechat mimo komponentu, protože ji potřebujeme spustit pouze jednou
testSanityConnection();

export default async function Home() {
  try {
    // Paralelní načítání dat pro lepší výkon
    const [homePage, latestCreations, myStory] = await Promise.all([
      getHomePage(),
      getMyCreations(),
      getMyStory()
    ]);

    console.log("HomePage:", homePage);
    console.log("LatestCreations:", latestCreations);
    console.log("MyStory:", myStory);

    return (
      <div>
        <h1>{homePage.title}</h1>
        {homePage.intro && (
          <CustomPortableTextComponent value={homePage.intro} />
        )}
        <nav>
          {homePage.menuItems && homePage.menuItems.length > 0 ? (
            homePage.menuItems.map((item) => (
              <a key={item.link} href={item.link}>{item.label}</a>
            ))
          ) : (
            <p>Žádné položky menu nejsou k dispozici.</p>
          )}
        </nav>
        <section>
          <h2>Nejnovější tvorba</h2>
          {latestCreations.slice(0, 3).map((creation) => (
            <div key={creation._id}>{creation.title}</div>
          ))}
        </section>
        <section>
          <h2>O mně</h2>
          {myStory ? (
            <p>{myStory.title}</p>
          ) : (
            <p>Informace o mě nejsou k dispozici.</p>
          )}
        </section>
      </div>
    )
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
    return <div>Došlo k chybě při načítání obsahu.</div>
  }
}