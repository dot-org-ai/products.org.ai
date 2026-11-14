/**
 * Full documentation export for LLMs
 * Returns all 48,000 products as plain text for AI consumption
 */

import { getLLMText } from 'do.org.ai/lib/get-llm-text'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    // Dynamic import - loads at runtime (ISR), not bundled in client
    const { products } = await import('products.org.ai/data-full')

    // Validate products array
    if (!products || products.length === 0) {
      return new Response('No products available', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' },
      })
    }

    // Generate content with error handling for individual products
    const allProducts = products.map((product) => {
      try {
        return getLLMText(product)
      } catch (error) {
        console.error(`Error generating LLM text for product ${product.code}:`, error)
        return `# ${product.name} (/${product.slug})\n\nError: Unable to generate content`
      }
    })

    const content = allProducts.join('\n\n---\n\n')

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
