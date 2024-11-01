import imageUrlBuilder from '@sanity/image-url'
import { createClient, groq } from "next-sanity";
import { HomePage, Articles,ArticlePage,ArticlePreview, Article, ContactPage, VideoPage, Page, Creations} from "../types/types";
import { NavItem} from '@/components/types';
import { config } from './config'

const client = createClient({
  projectId: "h246n0z5",
  dataset: "production",
  apiVersion: "1",
  useCdn: false, // set to `true` to fetch from edge cache
  token: process.env.SANITY_API_TOKEN
});

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return client.fetch(
    groq`*[_type == "creationPage" && slug.current == $slug][0] {
      title,
      content
    }`,
    { slug }
  )
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
        case 'articles':
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

function transformToArticle(preview: ArticlePreview): Article {
  return {
    _id: preview._id,
    title: preview.title,
    slug: preview.slug.current,
    excerpt: preview.excerpt,
    ogImage: preview.mainImage?.url
  }
}

export async function getArticlesPage(): Promise<{
  title: string;
  description?: string;
  featuredArticles: Article[];
}> {
  const result = await client.fetch(
    groq`*[_type == "articles"][0] {
      title,
      description,
      articlesPerPage,
      featuredArticles[]->{
        _id,
        title,
        slug,
        publishedAt,
        author,
        "mainImage": {
          "url": mainImage.asset->url,
          "alt": mainImage.alt
        },
        excerpt
      },
      seo
    }`
  )

  return {
    title: result.title,
    description: result.description,
    featuredArticles: result.featuredArticles.map(transformToArticle)
  }
}


export async function getArticlePreviews(): Promise<Article[]> {
  const previews = await client.fetch<ArticlePreview[]>(
    groq`*[_type == "articlePage"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      author,
      "mainImage": {
        "url": mainImage.asset->url,
        "alt": mainImage.alt
      },
      excerpt
    }`
  )
  
  // Transformujeme ArticlePreview na Article pro použití v gridu
  return previews.map(transformToArticle)
  
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

export async function getCreations(): Promise<Creations> {
  const result = await client.fetch(
    groq`*[_type == "creation"][0] {
      title,
      "pages": coalesce(creationPages[]-> {
        _id,
        title,
        "slug": slug.current,
        "excerpt": content[0].children[0].text[0..200] + "...",
        "ogImage": content[0].asset->url
      }, [])
    }`
  )
  
  console.log('Sanity result:', JSON.stringify(result, null, 2))
  
  return result
}






export async function getMyStory() {
  const client = createClient(config);

  try {
    const myStory = await client.fetch(
      groq`*[_type == "myStory"][0]{
        title,
        content,
        "imageUrl": image.asset->url
      }`
    );

    if (!myStory) {
      console.log("No story found in Sanity");
      return null;
    }

    return {
      title: myStory.title || 'Untitled',
      content: myStory.content || [],
      imageUrl: myStory.imageUrl || null,
    };
  } catch (error) {
    console.error("Error fetching story from Sanity:", error);
    throw error;
  }
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

export async function getPages(): Promise<{ slug: string }[]> {
  return client.fetch(
    groq`*[_type == "creationPage"] {
      "slug": slug.current
    }`
  )
}

export async function getArticleBySlug(slug: string): Promise<ArticlePage | null> {
  return client.fetch(
    groq`*[_type == "articlePage" && slug.current == $slug][0] {
      _type,
      _id,
      title,
      slug,
      publishedAt,
      author,
      mainImage {
        "url": asset->url,
        "alt": asset->alt,
        caption
      },
      excerpt,
      content[] {
        ...,
        _type == "image" => {
          "url": asset->url,
          "alt": asset->alt
        }
      },
      tags,
      seo
    }`,
    { slug }
  )
}