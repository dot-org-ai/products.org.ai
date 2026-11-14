/**
 * Markdown endpoint for individual segments
 * Allows AI agents to get a segment as Markdown at /llms.mdx/{code}
 *
 * The legacy route looked products up in the generated
 * `products.org.ai/data-full` module, which was left behind in the legacy
 * monorepo. Segments are the only entries this site renders, so they are the
 * only entries this route resolves.
 */

import { getLLMText } from 'do.org.ai/lib/get-llm-text'
import { notFound } from 'next/navigation'
import { findSegmentByCode } from '@/lib/segments'

export const revalidate = 3600 // Revalidate every hour

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const name = slug?.[0] || ''

  // Find the segment by its 8-digit code
  const segment = findSegmentByCode(name)

  if (!segment) {
    notFound()
  }

  const markdown = getLLMText(segment)

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
