import Link from 'next/link'
import type { SegmentMeta } from 'products.org.ai'
import { formatFamilyCount } from '@/lib/segments'

interface ProductSegmentsGridProps {
  segments: SegmentMeta[]
}

export function ProductSegmentsGrid({ segments }: ProductSegmentsGridProps) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Product Segments</h2>
        <p className="text-lg text-fd-muted-foreground">
          Explore {segments.length} major product categories covering everything from food and beverages to electronics and industrial equipment.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment) => (
          <Link
            key={segment.code}
            href={`/${segment.code}`}
            className="group block p-6 rounded-lg border border-fd-border bg-fd-card hover:bg-fd-accent hover:border-fd-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold group-hover:text-fd-primary transition-colors">{segment.name}</h3>
              <svg
                className="w-5 h-5 text-fd-muted-foreground group-hover:text-fd-primary group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-fd-muted-foreground">{formatFamilyCount(segment.familyCount)}</p>
            <p className="text-xs text-fd-muted-foreground/60 mt-1">Code: {segment.code}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
