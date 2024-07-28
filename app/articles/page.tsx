import Link from 'next/link';
import { getArticlePage, } from '../../sanity/sanity-utils'
import { ArticlePage, Article } from '@/types/types';

export default async function Articles() {
  const articlePage: ArticlePage = await getArticlePage();

  return (
    <div>
      <h1>{articlePage.title}</h1>
      {articlePage.articles.map((article: Article) => (
        <article key={article._id}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <Link href={`/articles/${article.slug.current}`}>Číst více</Link>
        </article>
      ))}
    </div>
  )
}