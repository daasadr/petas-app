import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { PortableTextBlock, ImageAsset, FileAsset } from 'sanity'
import Image from 'next/image'
import React from 'react'
import { urlFor } from '../sanity/sanity-utils'
import '../styles/globals.css';

type ImageBlock = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

type ContentBlock = PortableTextBlock | ImageAsset | FileAsset

const CustomPortableTextComponent = ({ value }: { value: Array<ContentBlock> }) => {
  if (!value || !Array.isArray(value)) {
    return null;
  }

  const customComponents: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: { value: ImageAsset }) => {
        if (!value?.asset) return null;
        
        try {
          const imageUrl = urlFor(value.asset).url();
          return (
            <div className='centred-image'>
              <Image 
                src={imageUrl}
                alt="Obrázek" 
                width={500} 
                height={300}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh', // Maximální výška vzhledem k výšce viewportu
                  objectFit: 'contain',
                }}
              />
            </div>
          )
        } catch (error) {
          console.error("Error processing image:", error);
          return null;
        }
      },
      file: ({ value }: { value: FileAsset }) => {
        if (!value?.url) return <span>Video není k dispozici</span>;
        
        const videoUrl = value.url;
        return (
          <div className='centred-image'>
            <video 
              controls 
              src={videoUrl}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            >
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