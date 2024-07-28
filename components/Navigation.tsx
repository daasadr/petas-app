import Link from 'next/link'

type NavItem = {
  _id: string;
  title: string;
  linkType: 'internal' | 'external';
  internalLink?: {
    _type: string;
    slug: {
      current: string;
    } | null;
  };
  externalLink?: string|null;
}

export default function Navigation({ items }: { items: NavItem[] }) {
  console.log('Navigation items:', items);
  return (
    <nav>
      {items.map((item) => (
        item.linkType === 'internal' ? (
          item.internalLink && item.internalLink.slug ? (
            <Link key={item._id} href={`/${item.internalLink.slug.current}`}>
              {item.title}
            </Link>
          ) : null
        ) : (
          <a key={item._id} href={item.externalLink ?? ''} target="_blank" rel="noopener noreferrer">
  {item.title}
</a>
        )
      ))}
    </nav>
  )
}