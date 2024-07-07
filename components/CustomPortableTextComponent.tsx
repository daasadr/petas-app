import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { PortableTextBlock, ImageAsset, FileAsset } from 'sanity'
import Image from 'next/image'
import React from 'react'


type ContentBlock = PortableTextBlock | ImageAsset | FileAsset

const CustomPortableTextComponent = ({ value }: { value: Array<PortableTextBlock | ImageAsset | FileAsset> }) => {
  const customComponents: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: { value: ImageAsset }) => {
        if (!value.asset) return null;
        const imageUrl = (value.asset as any).url; // Type assertion to avoid TypeScript error
        const altText: string = typeof value.alt === 'string' ? value.alt : 'Obrázek';

        return (
          <div>
            <Image src={imageUrl} alt={altText} width={500} height={300} />
          </div>
        )
      },
      file: ({ value }: { value: FileAsset }) => {
        if (!value.asset) return null;
        const videoUrl = (value.asset as any).url; // Type assertion to avoid TypeScript error
        return (
          <div>
            <video controls src={videoUrl}>
              Váš prohlížeč nepodporuje přehrávání videa.
            </video>
          </div>
        )
      },
    },
  }

  return <PortableText value={value} components={customComponents} />
}

export default CustomPortableTextComponent