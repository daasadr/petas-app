import { getArticleBySlug } from '../../../sanity/sanity-utils'
import CustomPortableTextComponent from '@/components/CustomPortableTextComponent';
import { Article } from '@/types/types';

export default async function OneArticle({ params }: { params: { slug: string } }) {
  const article: Article|null = await getArticleBySlug(params.slug);

  if (!article) return <div>Článek nenalezen</div>

  return (
    <article>
      <h1>{article.title}</h1>
      <p>Publikováno: {new Date(article.publishedAt).toLocaleDateString()}</p>
      <p>Autor: {article.author}</p>
      <CustomPortableTextComponent value={article.content} />
      <div>
        Tagy: {article.tags.join(', ')}
      </div>
    </article>
  )
}