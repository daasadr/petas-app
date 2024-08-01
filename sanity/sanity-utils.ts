import imageUrlBuilder from '@sanity/image-url'
import { createClient, groq } from "next-sanity";
import { HomePage, Article, ContactPage, MyCreationsType, MyStory, VideoPage, CreationSection, ArticleCollection } from "../types/types";
import { NavItem } from '@/components/Navigation';


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
    "internalLinkType": internalLink->_type
  }`);

  // Zpracování interních odkazů
  navigationItems.forEach((item: NavItem) => {
    if (item.linkType === 'internal' ) {
      switch (item.internalLinkType) {
        case 'myCreations':
          item.link = '/creation';
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
        
      }
    }
  });

  console.log('Navigation items from Sanity:', JSON.stringify(navigationItems, null, 2));
  return navigationItems;
}


export async function getArticleCollection(): Promise<ArticleCollection> {
  const result = await client.fetch<ArticleCollection>(
    groq`*[_type == "articleCollection"][0]{
      _id,
      _type,
      title,
      slug,
      description,
      "articles": articles[]->{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      author,
      excerpt,
      tags,}
      featuredArticles,
      showAllArticles,
      articlesPerPage
    }`
  );
    if (!result) {
    throw new Error('Nepodařilo se načíst data pro stránku s články');
  }
  
  return result;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(
    groq`*[_type == "article" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      content,
      publishedAt,
      author,
      tags,
      
    }`,
    { slug }
  );
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

export async function getMyCreations(): Promise<MyCreationsType[]> {
  const result = await client.fetch(
    groq`*[_type == "myCreations"]{
      _id,
      title,
      "sections": creationSection[]-> {
        _type,
        title,
        content,
        "slug": slug.current
      }
    }`
  );
  console.log('MyCreations data:', result);
  return result;
}

export async function getCreationSection(slug: string): Promise<CreationSection|null>{
  const result = await client.fetch(
    groq`*[_type == "creationSection" && slug.current == $slug][0]{
    _id,
    title,
    _type,
    content,
    "slug": slug.current,
    youtubeVideoId,
        "videoUrl": videoFile.asset->url,
        caption,
       
    }`,
    {slug}
  );
  return result || null;
}

  export async function getMyStory(): Promise<MyStory | null> {
  const result = await client.fetch<MyStory | null>(
    groq`*[_type == "myStory"][0]{
      title,
      content,
      
    }`
  );
  console.log("Data načtená ze Sanity:", result);
  return result || null;
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