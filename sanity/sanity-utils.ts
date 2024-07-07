import { createClient, groq } from "next-sanity";
import { HomePage, Page, ContactPage, MyCreationsType, MyStory, VideoPage } from "../types/types";

const client = createClient({
  projectId: "h246n0z5",
  dataset: "production",
  apiVersion: "2024-06-26",
  useCdn: false, // set to `true` to fetch from edge cache
  token: process.env.SANITY_API_TOKEN
});


export async function getHomePage(): Promise<HomePage> {
  const result = await client.fetch<HomePage>(
    groq`*[_type == "homepage"][0]{
      title,
      intro,
      menuItems[] {
        _type,
        label,
        link
      }
    }`
  );
  if (!result) {
    throw new Error('Nepodařilo se načíst data pro domovskou stránku');}
    return result;
}

export async function getPages(): Promise<Page[]> {
  return client.fetch(
    groq`*[_type == "page"]{
      _id,
      title,
      "slug": slug.current,
      content,
      publishedAt,
      author,
      tags,
      "ogImageUrl": ogImage.asset->url
    }`
  );
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return client.fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      content,
      publishedAt,
      author,
      tags,
      "ogImageUrl": ogImage.asset->url
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
  return client.fetch(
    groq`*[_type == "myCreations"]{
      _id,
      title,
      "sections": sections[]-> {
        _type,
        title,
        content
      }
    }`
  );
}

export async function getMyStory(): Promise<MyStory | null> {
  const result = await client.fetch<MyStory | null>(
    groq`*[_type == "myStory"][0]{
      title,
      content,
      "photoUrl": photo.asset->url
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