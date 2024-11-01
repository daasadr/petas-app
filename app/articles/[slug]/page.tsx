import { getArticleBySlug } from '@/sanity/sanity-utils'
import { PortableText, PortableTextReactComponents, PortableTextMarkComponentProps } from '@portabletext/react'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import styles from '@/styles/Articles.module.css'
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface ArticleImageProps {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface LinkValue {
  _type: 'link';
  href: string;
}

// Pomocná komponenta pro metadata článku
const ArticleMetadata = ({ date, author }: { date: string; author: string }) => (
  <div className={styles.metadata}>
    <time dateTime={date} className="flex items-center gap-2">
      <CalendarIcon className="h-4 w-4" />
      {new Date(date).toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </time>
    <span className={styles.author}>
      <UserIcon className="h-4 w-4 inline-block mr-2" />
      {author}
    </span>
  </div>
)

// Pomocná komponenta pro obrázek
const ArticleImage = ({ url, alt = '', caption, width = 1200, height = 675 }: ArticleImageProps) => (
  <figure className={styles.mainImage}>
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={styles.image}
      priority={width === 1200}
    />
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
)

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const article = await getArticleBySlug(params.slug)
  
  if (!article) return {}
  
  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      images: article.mainImage?.url ? [{ url: article.mainImage.url }] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  }
}

export default async function ArticlePage(props: PageProps) {
  const params = await props.params
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Komponenty pro PortableText s lepším typováním
  const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: { url: string; alt?: string; caption?: string } }) => (
      <ArticleImage
        url={value.url}
        alt={value.alt}
        caption={value.caption}
        width={800}
        height={450}
      />
    ),
    video: ({ value }: { value: { url: string; caption?: string } }) => (
      <figure className={styles.videoWrapper}>
        <iframe
          src={value.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {value.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
      </figure>
    ),
  },
    marks: {
      link: ({ children, value }: PortableTextMarkComponentProps<LinkValue>) => {
        return (
          <a href={value?.href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      }
    }
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1>{article.title}</h1>
        <ArticleMetadata 
          date={article.publishedAt} 
          author={article.author} 
        />
      </header>

      {article.mainImage?.url && (
        <ArticleImage
          url={article.mainImage.url}
          alt={article.mainImage.alt ?? ''}
          caption={article.mainImage.caption}
        />
      )}

      <div className={styles.content}>
        <PortableText
          value={article.content}
          components={portableTextComponents}
        />
      </div>

      {article.tags && article.tags.length > 0 && (
        <footer className={styles.tags}>
          <TagIcon className="h-5 w-5 mr-2" />
          {article.tags.map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </footer>
      )}
    </article>
  )
}