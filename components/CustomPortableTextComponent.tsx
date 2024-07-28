import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { PortableTextBlock, ImageAsset, FileAsset } from 'sanity'
import Image from 'next/image'
import React from 'react'
import { urlFor } from '../sanity/sanity-utils'

type ImageBlock = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

type ContentBlock = PortableTextBlock | ImageAsset | FileAsset

const CustomPortableTextComponent = ({ value }: { value: Array<ContentBlock> }) => {
  const customComponents: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: { value: ImageAsset }) => {
        if (!value.url) return <span>Obrázek není k dispozici</span>;
        
        const imageUrl = urlFor(value).url();
        

        return (
          <div>
            <Image 
              src={imageUrl} 
              alt="Obrázek" 
              width={500} 
              height={300} 
              layout="responsive"
            />
          </div>
        )
      },
      file: ({ value }: { value: FileAsset }) => {
        if (!value?.url) return <span>Video není k dispozici</span>;
        
        const videoUrl = value.url;
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