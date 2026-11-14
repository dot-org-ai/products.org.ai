/**
 * Full documentation export for LLMs
 * Returns the segments this site serves as plain text for AI consumption
 *
 * The legacy route exported every product from the generated
 * `products.org.ai/data-full` module, which was left behind in the legacy monorepo.
 */

import { getLLMText } from 'do.org.ai/lib/get-llm-text'
import { segments } from 'products.org.ai/metadata'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    // Validate segments array
    if (!segments || segments.length === 0) {
      return new Response('No products available', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' },
      })
    }

    // Generate content with error handling for individual segments
    const allSegments = segments.map((segment) => {
      try {
        return getLLMText(segment)
      } catch (error) {
        console.error(`Error generating LLM text for segment ${segment.code}:`, error)
        return `# ${segment.name} (/${segment.code})\n\nError: Unable to generate content`
      }
    })

    const content = allSegments.join('\n\n---\n\n')

    // Check content size (warn if > 5MB)
    const sizeInMB = new Blob([content]).size / (1024 * 1024)
    if (sizeInMB > 5) {
      console.warn(`LLM full export is large: ${sizeInMB.toFixed(2)}MB`)
    }

    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Size-MB': sizeInMB.toFixed(2),
      },
    })
  } catch (error) {
    console.error('Error generating LLM full export:', error)
    return new Response('Internal server error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}
