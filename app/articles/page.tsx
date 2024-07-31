import Link from 'next/link';
import { getArticleCollection } from '../../sanity/sanity-utils'
import { ArticleCollection, Article } from '@/types/types';

export default async function Articles() {
  const articleCollection: ArticleCollection = await getArticleCollection();

  return (
    <div>
      <h1>{articleCollection.title}</h1>
      <p>{articleCollection.description}</p>
      {articleCollection.articles.map((article: Article) => (
        <article key={article._id}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <Link href={`/articles/${article.slug}`}>Číst více</Link>
        </article>
      ))}
    </div>
  )
}