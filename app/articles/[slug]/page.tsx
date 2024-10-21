import { getPageBySlug } from '../../../sanity/sanity-utils'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) return <div>Článek nenalezen</div>

  return (
    <article>
      <h1>{page.title}</h1>
      <p>Publikováno: {new Date(page.publishedAt).toLocaleDateString()}</p>
      <p>Autor: {page.author}</p>
      <div>{/* Render page.content */}</div>
      <div>
        Tagy: {page.tags.join(', ')}
      </div>
    </article>
  )
}