import { PortableTextBlock, ImageAsset, Reference, Slug, FileAsset } from 'sanity'

export interface HomePage {
  _type: 'homepage'
  title: string
  intro: Array<PortableTextBlock | ImageAsset>
  menuItems: Array<{
    _type: 'object'
    label: string
    link: Reference
  }>
}

export interface Page {
  _type: 'page'
  title: string
  content: Array<PortableTextBlock | ImageAsset>
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

export interface MyCreations {
  _type: 'myCreations'
  title: string
  sections: Reference[] // Reference to CreationSection
}

export interface MyStory {
  _type: 'myStory'
  title: string
  content: Array<PortableTextBlock | ImageAsset>
  photo: ImageAsset
}

export interface VideoPage {
  _type: 'videoPage'
  videos: Array<{
    _type: 'object'
    videoFile: FileAsset
    caption: string
  }>
}


