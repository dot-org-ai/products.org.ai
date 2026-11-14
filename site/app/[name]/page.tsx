import { segments } from 'products.org.ai'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { findSegmentByCode, formatFamilyCount } from '@/lib/segments'
import { ROUTES } from '@/lib/constants'

interface PageProps {
  params: Promise<{ name: string }>
}

export default async function ProductPage({ params }: PageProps) {
  // Validate segments data
  if (!segments || !Array.isArray(segments)) {
    throw new Error('Invalid segments data')
  }

  const { name } = await params

  // Check if it's a segment code
  const segment = findSegmentByCode(name)

  if (!segment) {
    notFound()
  }

  // Format family count with null safety
  const familyCountText = formatFamilyCount(segment.familyCount)

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="text-sm text-fd-muted-foreground mb-2">Segment {segment.code}</div>
        <h1 className="text-4xl font-bold mb-4">{segment.name}</h1>
        <p className="text-lg text-fd-muted-foreground">Contains {familyCountText}</p>
      </div>

      <div className="space-y-8">
        {/* Overview Card */}
        <div className="p-6 rounded-lg border border-fd-border bg-fd-card">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-fd-muted-foreground">Code</dt>
              <dd className="font-mono font-medium">{segment.code}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-fd-muted-foreground">Product Families</dt>
              <dd className="font-medium">{segment.familyCount ?? 0}</dd>
            </div>
          </dl>
        </div>

        {/* Product Families Section */}
        <div className="p-6 rounded-lg border border-fd-border bg-fd-card">
          <h2 className="text-xl font-semibold mb-4">Product Families</h2>
          <p className="text-fd-muted-foreground">
            This segment contains {familyCountText}. Detailed family and brick data will be available in the next phase of development.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-fd-border">
          <Link href={ROUTES.HOME} className="inline-flex items-center text-fd-primary hover:underline">
            ← Back to all segments
          </Link>
          <div className="flex gap-2">
            <Link
              href={ROUTES.API}
              className="inline-flex items-center px-4 py-2 text-sm rounded-md border border-fd-border hover:bg-fd-accent transition-colors"
            >
              View API
            </Link>
            <Link
              href={ROUTES.PACKAGE}
              className="inline-flex items-center px-4 py-2 text-sm rounded-md border border-fd-border hover:bg-fd-accent transition-colors"
            >
              View Package
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Generate static params for all segments at build time
 * This enables Incremental Static Regeneration (ISR) for all segment pages
 *
 * @returns Array of param objects containing segment codes for static generation
 * @example
 * // Returns: [{ name: '10000000' }, { name: '10000100' }, ...]
 */
export async function generateStaticParams() {
  return segments.map((segment) => ({
    name: segment.code,
  }))
}

/**
 * Generate metadata for SEO optimization
 * Creates page title and description based on segment data
 *
 * @param params - Page params containing segment code
 * @returns Metadata object with title and description
 * @example
 * // For segment "10000000 - Food/Beverage/Tobacco"
 * // Returns: { title: "Food/Beverage/Tobacco", description: "GS1 GPC Segment 10000000: Food/Beverage/Tobacco - Contains 15 product families" }
 */
export async function generateMetadata({ params }: PageProps) {
  const { name } = await params
  const segment = findSegmentByCode(name)

  if (!segment) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: segment.name,
    description: `GS1 GPC Segment ${segment.code}: ${segment.name} - Contains ${formatFamilyCount(segment.familyCount)}`,
  }
}
