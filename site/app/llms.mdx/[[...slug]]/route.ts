/**
 * MDX endpoint for individual products
 * Allows AI agents to get product content as Markdown by appending .mdx
 */

import { getLLMText } from 'do.org.ai/lib/get-llm-text'
import { notFound } from 'next/navigation'

export const revalidate = 3600 // Revalidate every hour

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const name = slug?.[0] || ''

  // Dynamic import - loads at runtime (ISR), not bundled in client
  const { getProductBySlug, getProductByCode } = await import('products.org.ai/data-full')

  // Try to find product by slug first, then by code
  const product = getProductBySlug(name) || getProductByCode(name)

  if (!product) {
    notFound()
  }

  const markdown = getLLMText(product)

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
