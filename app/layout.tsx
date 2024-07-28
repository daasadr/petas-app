import { getNavigation } from '../sanity/sanity-utils'
import Navigation from '../components/Navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationItems = await getNavigation()

  return (
    <html lang="cs">
      <body>
        <Navigation items={navigationItems} />
        {children}
      </body>
    </html>
  )
}
