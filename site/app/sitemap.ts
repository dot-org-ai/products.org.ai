/**
 * Main sitemap (optimized)
 * Only includes homepage, segments, families, and LLM endpoints
 * Individual products accessible via segment sitemaps at /sitemap/[segment]
 */

import { MetadataRoute } from 'next'
import type { Product } from 'products.org.ai/types'

interface Family {
  code: string
  name: string
  segmentCode: string
}

interface Segment {
  code: string
  name: string
  families: Family[]
}

/**
 * Build hierarchy from products (lightweight - only extracts unique segments/families)
 */
function buildHierarchy(products: readonly Product[]): { segments: Segment[] } {
  const segmentMap = new Map<string, { name: string; families: Map<string, string> }>()

  // Extract unique segments and families
  for (const product of products) {
    if (!segmentMap.has(product.segment)) {
      segmentMap.set(product.segment, {
        name: product.segmentName,
        families: new Map(),
      })
    }
    const segment = segmentMap.get(product.segment)!
    segment.families.set(product.family, product.familyName)
  }

  // Convert to array structure
  const segments: Segment[] = []
  for (const [code, { name, families }] of segmentMap) {
    segments.push({
      code,
      name,
      families: Array.from(families.entries()).map(([familyCode, familyName]) => ({
        code: familyCode,
        name: familyName,
        segmentCode: code,
      })),
    })
  }

  return { segments }
}

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

  // Dynamic import - loads at build time, not bundled in client
  const { products } = await import('products.org.ai/data-full')
  const hierarchy = buildHierarchy(products)

  // Add segment and family pages only (not individual products)
  hierarchy.segments.forEach((segment) => {
    routes.push({
      url: `${baseUrl}/${segment.code}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    // Add sitemap link for this segment's products
    routes.push({
      url: `${baseUrl}/sitemap/${segment.code}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })

    // Add family pages
    segment.families.forEach((family) => {
      routes.push({
        url: `${baseUrl}/${family.code}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  })

  return routes
}
