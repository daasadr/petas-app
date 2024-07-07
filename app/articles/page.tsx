import { getPages } from '../../sanity/sanity-utils'

export default async function Articles() {
  const pages = await getPages();

  return (
    <div>
      <h1>Články</h1>
      {pages.map((page) => (
        <article key={page._id}>
          <h2>{page.title}</h2>
          <p>Publikováno: {new Date(page.publishedAt).toLocaleDateString()}</p>
          <p>Autor: {page.author}</p>
          <a href={`/articles/${page.slug}`}>Číst více</a>
        </article>
      ))}
    </div>
  )
}