import imageUrlBuilder from '@sanity/image-url'
import { createClient, groq } from "next-sanity";
import { HomePage, Article, ContactPage, Creation, MyStory, VideoPage, } from "../types/types";
import { NavItem} from '@/components/types';


const client = createClient({
  projectId: "h246n0z5",
  dataset: "production",
  apiVersion: "2024-06-26",
  useCdn: false, // set to `true` to fetch from edge cache
  token: process.env.SANITY_API_TOKEN
});

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getHomePage(): Promise<HomePage> {
  const result = await client.fetch<HomePage>(
    groq`*[_type == "homepage"][0]{
      title,
      intro,
    }`
  );
  if (!result) {
    throw new Error('Nepodařilo se načíst data pro domovskou stránku');}
    return result;
}


export async function getNavigation() {
  const navigationItems: NavItem[] = await client.fetch(`*[_type == "navigation"] | order(order asc) {
    _id,
    title,
    linkType,
    "link": select(
      linkType == 'internal' => '/' + internalLink->slug.current,
      linkType == 'external' => externalLink,
      null
    ),
    "internalLinkType": internalLink->_type,
    externalLink
  }`);

  // Zpracování interních odkazů
  navigationItems.forEach((item: NavItem) => {
    if (item.linkType === 'internal' && item.internalLinkType ) {
      switch (item.internalLinkType) {
        case 'myCreations':
          item.link = '/creations';
          break;
        case 'myStory':
          item.link = '/my-story';
          break;
        case 'videoPage':
          item.link = '/videos';
          break;
        case 'contactPage':
          item.link = '/contact';
          break;
        case 'articleCollection':
          item.link = '/articles';
          break;
        case 'homepage':
          item.link = '/';
          break
      }
    }
  });

  console.log('Navigation items from Sanity:', JSON.stringify(navigationItems, null, 2));
  return navigationItems;
}


export async function getArticles(): Promise<Article[]> {
  return client.fetch(
    groq`*[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      content[]{
        ...,
        _type == "image" => {
          "url": asset->url,
          "alt": asset->alt
        },
        _type == "video" => {
          "url": url,
          "caption": caption
        }
      },
      publishedAt,
      slug,
      excerpt,
      author,
      tags,
      "ogImage": ogImage.asset->url
    }`
  )
}
export async function getContactPage(): Promise<ContactPage> {
  return client.fetch(
    groq`*[_type == "contactPage"][0]{
      contactInfo,
      contactFormHeading,
      contactFormPrompt,
      contactFormFields
    }`
  );
}

export async function getCreations(): Promise<Creation[]> {
  return client.fetch(
    groq`*[_type == "creation"] | order(publishedAt desc) {
      _id,
      title,
          content[]{
        ...,
        _type == "image" => {
          "url": asset->url,
          "alt": asset->alt
        },
        _type == "video" => {
          "url": url,
          "caption": caption
        }
      },
      publishedAt
    }`
  )
}



  export async function getMyStory() {
  const result = await client.fetch(
    groq`*[_type == "myStory"][0]{
      title,
      content,
      "imageUrl": image.asset->url
      
    }`
  );
  console.log("Data načtená ze Sanity:", result);
  return result;
}

export async function getVideoPage(): Promise<VideoPage> {
  return client.fetch(
    groq`*[_type == "videoPage"][0]{
      videos[] {
      videoType,
      youtubeVideoId,
        "videoUrl": videoFile.asset->url,
        caption
      }
    }`
  );
}

export async function testSanityConnection() {
  try {
    const result = await client.fetch(`*[_type == "homepage"][0]`);
    console.log("Test připojení k Sanity úspěšný:", result);
    return true;
  } catch (error) {
    console.error("Chyba při připojení k Sanity:", error);
    return false;
  }
}