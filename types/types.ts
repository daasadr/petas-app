import { PortableTextBlock, ImageAsset,  Slug, FileAsset } from 'sanity'

export interface MenuItem {
  _type: 'object'
  label: string
  linkType: 'internal' | 'external'
  internalLink?: {
    _type: string;
    slug: string | null;
  }
  externalLink?: string | null;
}

export interface HomePage {
  _type: 'homepage'
  title: string
  intro: Array<PortableTextBlock | ImageAsset>
}

export interface ArticlePage {
  _id: string
  _type: 'articlePage'
  articles: Article[]
  title: string
  excerpt? : string
  author: string
  slug: Slug
  descriptions: string
  featuredArticles: Article[]
  showAllArticles: boolean
  articlesPerPage: number

}

export interface Article {
  map(arg0: (artic: Article) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>
  _type: 'artic'
  title: string
  slug: Slug
  content: Array<PortableTextBlock | ImageAsset | FileAsset>
  _id: number
  excerpt: string
  publishedAt: string
  author: string
  tags: string[]
  
  ogImage: ImageAsset


}
export interface ContactPage {
  _type: 'contactPage'
  contactInfo: PortableTextBlock[]
  contactFormHeading: string
  contactFormPrompt: string
  contactFormFields: Array<{
    _type: 'object'
    label: string
    id: string
    type: 'text' | 'email'
  }>
}  

export interface CreationSection {
  _type: 'creationSection'
  title: string
  _id: number
  author: string
  publishedAt: string
  content: Array<PortableTextBlock | ImageAsset>
  slug: string
  

}

export interface MyCreationsType {
  _type: 'myCreations'
  title: string
  _id: string
  sections: CreationSection[] // Reference to CreationSection
  
}

export interface MyStory {
  _type: 'myStory'
  title: string
  content: Array<PortableTextBlock | ImageAsset>
  imageUrl: string
  url: string
}

export interface VideoPage {
  _type: 'videoPage'
  videos: Array<{
    url: string
    _type: 'object'
    videoType: 'youtube' | 'file'
    youtubeVideoId?: string
    videoFile?: FileAsset
    caption: string
    videoUrl?: string
  }>
}


