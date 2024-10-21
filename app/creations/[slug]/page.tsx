import { getPageBySlug, getPages } from '../../../sanity/sanity-utils'
import CustomPortableTextComponent from '../../../components/CustomPortableTextComponent'
import { PortableTextBlock, ImageAsset, FileAsset } from 'sanity'
import { Page as PageType } from '../../../types/types'

interface Page {
  title: string
  content: Array<PortableTextBlock | ImageAsset | FileAsset>
  slug: string
}

export default async function CreationPage({ params }: { params: { slug: string } }) {
  const page: PageType | null = await getPageBySlug(params.slug)

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