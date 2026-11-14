/**
 * Create root layout for .org.ai sites
 * Based on products.org.ai/app/layout.tsx
 */

import { RootProvider } from 'fumadocs-ui/provider'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import type { OrgAiSiteConfig } from '../types'

const inter = Inter({
  subsets: ['latin'],
})

interface CreateRootLayoutOptions {
  config: OrgAiSiteConfig
  /** Additional fonts to load */
  fonts?: string[]
  /** Custom body className */
  bodyClassName?: string
  /** Custom global styles import */
  globalStyles?: string
}

/**
 * Create a root layout component for an .org.ai site
 *
 * @example
 * ```tsx
 * // In your app/layout.tsx
 * import { createRootLayout } from 'do.org.ai'
 *
 * export const metadata = {
 *   title: 'Products.org.ai',
 *   description: 'GS1 GPC Product Classifications'
 * }
 *
 * export default createRootLayout({
 *   config: {
 *     namespace: 'products',
 *     title: 'Products.org.ai',
 *     description: 'GS1 GPC Product Classifications'
 *   }
 * })
 * ```
 */
export function createRootLayout(options: CreateRootLayoutOptions) {
  const { config, bodyClassName, globalStyles } = options

  return function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={config.description} />
          {config.domain && <link rel="canonical" href={`https://${config.domain}`} />}
        </head>
        <body className={bodyClassName}>
          <RootProvider
            search={{
              enabled: config.searchEnabled !== false,
            }}
            theme={{
              enabled: true,
              defaultTheme: 'system',
            }}
          >
            {children}
          </RootProvider>
        </body>
      </html>
    )
  }
}

/**
 * Create metadata for an .org.ai site
 *
 * @example
 * ```tsx
 * export const metadata = createMetadata({
 *   namespace: 'products',
 *   title: 'Products.org.ai',
 *   description: 'GS1 GPC Product Classifications'
 * })
 * ```
 */
export function createMetadata(config: Pick<OrgAiSiteConfig, 'title' | 'description' | 'domain'>) {
  return {
    title: {
      default: config.title,
      template: `%s | ${config.title}`,
    },
    description: config.description,
    metadataBase: config.domain ? new URL(`https://${config.domain}`) : undefined,
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      siteName: config.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
