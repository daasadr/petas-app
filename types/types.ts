import { PortableTextBlock, ImageAsset,  FileAsset } from 'sanity'

export interface Slug {
  _type: "slug";
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


export interface ImagePreview {
  url: string;
  alt?: string;
}

export interface Image extends ImagePreview {
  caption?: string;
}

export interface Video {
  _type: 'video';
  url: string;
  caption?: string;
}

// Základní rozhraní pro společné vlastnosti článků
interface BaseArticle {
  _id: string;
  title: string;
  excerpt?: string;
}

// Rozhraní pro náhled článku v gridu
export interface Article extends BaseArticle {
  slug: string;
  ogImage?: string;
}

// Rozhraní pro preview článku z Sanity
export interface ArticlePreview extends BaseArticle {
  slug: Slug;
  publishedAt: string;
  author: string;
  mainImage?: ImagePreview;
}

// Rozhraní pro plnou stránku článku
export interface ArticlePage {
  _type: 'articlePage';
  _id: string;
  title: string;
  slug: Slug;
  publishedAt: string;
  author: string;
  mainImage?: {
    url: string;
    alt?: string;
    caption?: string;
  };
  excerpt?: string;
  content: (PortableTextBlock | Image | Video)[];
  tags: string[];
  seo?: SeoMetadata;
}

// Rozhraní pro stránku se seznamem článků
export interface Articles {
  _type: 'articlesPage';
  title: string;
  description?: string;
  articlesPerPage: number;
  featuredArticles: ArticlePreview[];
  seo?: SeoMetadata;
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


