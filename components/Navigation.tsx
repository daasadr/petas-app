import Link from 'next/link'

type NavItem = {
  _id: string;
  title: string;
  linkType: 'internal' | 'external';
  internalLink?: {
    _type: string;
    slug: string;
  };
  externalLink?: string;
}

export default function Navigation({ items }: { items: NavItem[] }) {
  console.log('Navigation items:', items);
  return (
    <nav>
      {items.map((item) => {
        if (item.linkType === 'internal' && item.internalLink){
          let href = '/';
          switch (item.internalLink._type) {
            case 'myCreations':
              href = '/my-creations';
              break;
            case 'myStory':
              href = '/my-story';
              break;
            case 'videoPage':
              href = '/videos';
              break;
            case 'contactPage':
              href = '/contact';
              break;
            case 'articleCollection':
              href = '/articles';
              break;       
          }
          return (
            <Link key = {item._id} href = {href}>
              {item.title}
            </Link>
          );
        } else if (item.linkType === 'external' && item.externalLink){
          return (
            <a key={item._id} href={item.externalLink} target="_blank" rel="noopener noreferrer">
            {item.title}
            </a>
          );
        }
return null;
      })}
    </nav>
  )
}