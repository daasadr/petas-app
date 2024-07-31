import Link from 'next/link';

export type NavItem = {
  _id: string;
  title: string;
  linkType: 'internal' | 'external';
  link: string | null;
  internalLinkType?: string;
};

export default function Navigation({ items }: { items: NavItem[] }) {
  if (!items || items.length === 0) {
    return <nav>No navigation items available</nav>;
  }

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f0f0f0' }}>
      {items.map((item) => {
        if (item.linkType === 'internal' && item.link) {
          return (
            <Link key={item._id} href={item.link}>
              {item.title || 'Unnamed Item'}
            </Link>
          );
        } else if (item.linkType === 'external' && item.link) {
          return (
            <a key={item._id} href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'none' }}>
              {item.title || 'Unnamed Item'}
            </a>
          );
        }
        return null;
      })}
    </nav>
  );
}