import { PortableTextBlock, ImageAsset } from 'sanity'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'
import { getMyStory } from '../../sanity/sanity-utils'
import Image from 'next/image'

interface MyStoryData {
  title: string;
  content: Array<PortableTextBlock | ImageAsset>;
  imageUrl?: string;
  slug: {
    current: string;
  };
}

export default async function MyStory() {
  try {
    const myStory = await getMyStory();
    
    console.log("MyStory in page component:", myStory);
    
    if (!myStory) {
      return (
        <div className="container mx-auto p-4">
          <p>Příběh nebyl nalezen.</p>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{myStory.title}</h1>
        
        {myStory.content && (
          <div className="prose max-w-none mb-6">
            <CustomPortableTextComponent value={myStory.content} />
          </div>
        )}
        
        {myStory.imageUrl && (
          <div className="relative w-full max-w-[500px] mx-auto">
            <Image 
              src={myStory.imageUrl}
              alt={myStory.title || "Hlavní obrázek"}
              width={500}
              height={300}
              priority
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading MyStory:", error);
    return (
      <div className="container mx-auto p-4 text-red-600">
        <p>Došlo k chybě při načítání příběhu: {error instanceof Error ? error.message : 'Neznámá chyba'}</p>
      </div>
    );
  }
}