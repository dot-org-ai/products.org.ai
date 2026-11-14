/**
 * Search API endpoint
 * Returns search results from GS1 GPC products
 * Redirects to main API at api.products.org.ai
 */

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      message: 'This endpoint has moved to the main API',
      api: 'https://api.products.org.ai',
      docs: 'https://products.org.ai/api',
      reference: 'https://products.org.ai/api-reference',
    },
    { status: 410 }
  )
}
