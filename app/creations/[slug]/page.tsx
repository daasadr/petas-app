import { getCreationSection, getMyCreations, } from '../../../sanity/sanity-utils'
import CustomPortableTextComponent from '../../../components/CustomPortableTextComponent'
import { PortableTextBlock, ImageAsset, FileAsset } from 'sanity'
import { CreationSection  } from '../../../types/types'

interface CreationPage {
  title: string
  content: Array<PortableTextBlock | ImageAsset | FileAsset>
  slug: string
}

export default async function CreationPage({ params }: { params: { slug: string } }) {
  const creationSection: CreationSection| null = await getCreationSection(params.slug)

  if (!creationSection) return <div>Stránka nenalezena</div>

  return (
    <div>
      <h1>{creationSection.title}</h1>
      <CustomPortableTextComponent value={creationSection.content} />
    </div>
  )
}

export async function generateStaticParams() {
  const myCreations = await getMyCreations()
  const allSections = myCreations.flatMap(creation => creation.sections)
  
  return allSections.map((section) => ({
    slug: section.slug
  }))
}