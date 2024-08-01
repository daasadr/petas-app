import { getMyCreations } from '../../sanity/sanity-utils'
import { PortableTextBlock, ImageAsset, FileAsset } from 'sanity'
import CustomPortableTextComponent from '../../components/CustomPortableTextComponent'
import {  CreationSection , MyCreationsType} from '../../types/types'

export default async function MyCreations() {
  const creations = await getMyCreations()

  return (
    <div>
      <h1>Moje tvorba</h1>
      {creations.map((creation: MyCreationsType) => (
        <section key={creation._id}>
          <h2>{creation.title}</h2>
          {creation.sections.map((section: CreationSection, index) => (
            <div key={index}>
              <h3>{section.title}</h3>
              <CustomPortableTextComponent value={section.content as Array<PortableTextBlock | ImageAsset | FileAsset>} />
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export async function generateStaticParams() {
  const creations = await getMyCreations()
  return creations.map((creation) => ({ slug: creation._id.toString }))
}