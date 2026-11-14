import { createRootLayout } from 'do.org.ai/app/create-root-layout'
import type { Metadata } from 'next'
import 'do.org.ai/templates/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Products.org.ai - GS1 GPC Product Classifications',
    template: '%s | Products.org.ai',
  },
  description: 'Browse and search GS1 Global Product Classification (GPC) product classifications',
  metadataBase: new URL('https://products.org.ai'),
}

const siteConfig = {
  namespace: 'products',
  title: 'Products.org.ai',
  description: 'GS1 Global Product Classification (GPC)',
  domain: 'products.org.ai',
  searchEnabled: true,
  adsEnabled: true,
}

export default createRootLayout({ config: siteConfig })
