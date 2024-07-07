import { PortableTextBlock, ImageAsset,  Slug, FileAsset } from 'sanity'

export interface HomePage {
  _type: 'homepage'
  title: string
  intro: Array<PortableTextBlock | ImageAsset>
  menuItems?: Array<{
    _type: 'object'
    label: string
    link: string
  }>
}

export interface Page {
  _type: 'page'
  title: string
  _id: number
  content: Array<PortableTextBlock | ImageAsset | FileAsset>
  slug: Slug
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
  content: Array<PortableTextBlock | ImageAsset>
  
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
  photoUrl: string
}

export interface VideoPage {
  _type: 'videoPage'
  videos: Array<{
    _type: 'object'
    videoType: 'youtube' | 'file'
    youtubeVideoId?: string
    videoFile?: FileAsset
    caption: string
    videoUrl?: string
  }>
}


