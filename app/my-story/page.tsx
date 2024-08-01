import { PortableTextBlock, ImageAsset } from 'sanity'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'
import { getMyStory } from '../../sanity/sanity-utils'
import Image from 'next/image'
import { urlFor } from '../../sanity/sanity-utils'


export default async function MyStory() {
  const myStory = await getMyStory()
  
  console.log(myStory);
  
  if (!myStory) {
    return <div>Příběh nebyl nalezen.</div>;
  }
  
  return (
    <div>
      <h1>{myStory.title}</h1>
      <CustomPortableTextComponent value={myStory.content as (PortableTextBlock | ImageAsset)[]} />
      
      <Image src={(myStory.imageUrl)}  alt="Moje fotografie" width={500} height={300}/>
    </div>
  )
}
