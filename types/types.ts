import { PortableTextBlock, ImageAsset,  FileAsset } from 'sanity'

export interface Slug {
  current: string;
}
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



export interface Article {
  _type: 'article'
  title: string
  slug: Slug
  content: (PortableTextBlock | ImageBlock | VideoBlock)[]
  _id: string
  excerpt: string
  publishedAt: string
  author: string
  tags: string[]
  ogImage: string
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

export interface Creation {
  _type: 'creation'
  _id: string
  title: string
  content: (PortableTextBlock | ImageBlock | VideoBlock)[]
  publishedAt: string
}

interface ImageBlock {
  _type: 'image'
  url: string
  alt?: string
}

interface VideoBlock {
  _type: 'video'
  url: string
  caption?: string
}
export interface MyStory {
  _type: 'myStory'
  title: string
  content: Array<PortableTextBlock | ImageAsset>
  imageUrl: string
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


