import { PortableTextBlock, ImageAsset } from 'sanity'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'
import { getMyStory, urlFor  } from '../../sanity/sanity-utils'
import Image from 'next/image'



export default async function MyStory() {
  try{
    const myStory = await getMyStory()
  
  console.log("MyStory in component:", myStory);
  
  if (!myStory) {
    return <div>Příběh nebyl nalezen.</div>;
  }
  
  return (
    <div>
      <h1>{myStory.title}</h1>
      {myStory.content && (
          <CustomPortableTextComponent value={myStory.content} />
        )}
      {myStory.imageUrl && (
        <Image 
          src={myStory.imageUrl}
          alt="Moje fotografie" 
          width={500} 
          height={300}
        />
      )}
    </div>
  )
} catch (error) {
  console.error("Error loading MyStory:", error);
  return <div>Došlo k chybě při načítání příběhu.</div>;
}
}
