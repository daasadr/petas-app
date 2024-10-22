import { getPageBySlug, getPages } from '../../../sanity/sanity-utils'
import CustomPortableTextComponent from '../../../components/CustomPortableTextComponent'
import { Page } from '@/types/types'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage(props: PageProps) {
  // Destrukturujeme params až po jejich použití
  const page: Page | null = await getPageBySlug(props.params.slug)

  if (!page) return <div>Stránka nenalezena</div>

  return (
    <div>
      <h1>{page.title}</h1>
      <CustomPortableTextComponent value={page.content} />
    </div>
  )
}

export async function generateStaticParams() {
  const pages = await getPages()
  return pages.map((page) => ({ slug: page.slug }))
}