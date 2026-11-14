/**
 * Individual segment sitemaps
 * Each segment gets its own sitemap to keep size manageable
 */

import { segments } from 'products.org.ai/metadata'

export const revalidate = 3600 // 1 hour

export async function GET(_req: Request, { params }: { params: Promise<{ segment: string }> }) {
  const { segment: segmentCode } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://products.org.ai'
  const lastModified = new Date().toISOString()

  // Dynamic import - loads at runtime (ISR), not bundled in client
  const { products } = await import('products.org.ai/data-full')

  // Get products for this segment
  const segmentProducts = products.filter((p) => p.segment === segmentCode)

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${segmentProducts
  .map(
    (product) => `  <url>
    <loc>${baseUrl}/${product.slug}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

// Generate static params for all segments
export async function generateStaticParams() {
  return segments.map((segment) => ({
    segment: segment.code,
  }))
}
