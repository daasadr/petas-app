import { getNavigation } from '../sanity/sanity-utils'
import DynamicNavigation from '../components/DynamicNavigation'
import '../styles/globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationItems = await getNavigation()

  return (
    <html lang="cs">
      <body>
        <DynamicNavigation items={navigationItems} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
