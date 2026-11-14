import type { SegmentMeta } from 'products.org.ai'

interface StatsSectionProps {
  segments: SegmentMeta[]
  totalItems: number
}

export function StatsSection({ segments, totalItems }: StatsSectionProps) {
  const totalFamilies = segments.reduce((acc, s) => acc + (s.familyCount ?? 0), 0)

  return (
    <div className="border-t border-fd-border">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-fd-primary mb-2">{segments.length}</div>
            <div className="text-fd-muted-foreground">Product Segments</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-fd-primary mb-2">{totalFamilies}+</div>
            <div className="text-fd-muted-foreground">Product Families</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-fd-primary mb-2">{totalItems.toLocaleString()}</div>
            <div className="text-fd-muted-foreground">Product Classifications</div>
          </div>
        </div>
      </div>
    </div>
  )
}
