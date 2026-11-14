/**
 * Main sitemap
 * Lists the pages this site serves: the homepage, the LLM export, and one page per segment
 *
 * The legacy sitemap also listed family pages and a product sitemap per segment,
 * built from the generated `products.org.ai/data-full` module. That module was
 * left behind in the legacy monorepo, and those URLs never resolved to a page
 * (`app/[name]/page.tsx` only renders segment codes), so they are not listed.
 */

import { MetadataRoute } from 'next'
import { segments } from 'products.org.ai/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://products.org.ai'
  const lastModified = new Date()

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ]

  // Add segment pages
  segments.forEach((segment) => {
    routes.push({
      url: `${baseUrl}/${segment.code}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return routes
}
