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



export interface ArticlePage {
  _type: 'articlePage';
  _id: string;
  title: string;
  slug: Slug;
  publishedAt: string;
  author: string;
  mainImage?: Image;
  excerpt?: string;
  content: (PortableTextBlock | Image | Video)[];
  tags: string[];
  seo?: SeoMetadata;
}

export interface Articles {
  featuredArticles: [];
  _type: 'articlesPage';
  title: string;
  description?: string;
  articlesPerPage: number;
  seo?: SeoMetadata;
}

export interface ArticlePreview {
  _id: string;
  title: string;
  slug: Slug;
  publishedAt: string;
  author: string;
  mainImage?: ImagePreview;  // použijeme ImagePreview místo Image
  excerpt?: string;
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

export interface Creations {
  title: string;
  pages: CreationPage[];
}

export interface CreationPage {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  ogImage: string;
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

export interface SeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
}

export interface Image {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    url: string;  // přidáno
  };
  alt?: string;
  caption?: string;
}
export interface ImagePreview {
  url: string;
  alt?: string;
}

export interface Video {
  _type: 'video';
  url: string;
  caption?: string;
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
export interface Page {
  title: string;
  content: Array<PortableTextBlock | ImageAsset | FileAsset>;
}


