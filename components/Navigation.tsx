import Link from 'next/link'

type NavItem = {
  _id: string;
  title: string;
  link: string;
  linkType: string;
}

export default function Navigation({ items }: { items: NavItem[] }) {
  console.log('Navigation items:', items);
    return (
    <nav>
      {items.map((item) => (
        item.linkType === 'internal' ? (
          <Link key={item._id} href={item.link}>
            {item.title}
          </Link>
        ) : (
          <a key={item._id} href={item.link} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        )
      ))}
    </nav>
  )
}