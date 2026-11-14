import Link from 'next/link'
import { ROUTES } from '@/lib/constants'

interface HeroSectionProps {
  totalItems: number
  firstSegmentCode?: string
}

export function HeroSection({ totalItems, firstSegmentCode }: HeroSectionProps) {
  return (
    <div className="border-b border-fd-border bg-gradient-to-b from-fd-background to-fd-muted/20">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-fd-primary to-fd-primary/60 bg-clip-text text-transparent">
            Products.org.ai
          </h1>
          <p className="text-xl md:text-2xl text-fd-muted-foreground mb-4">GS1 Global Product Classification (GPC)</p>
          <p className="text-lg text-fd-muted-foreground/80 mb-8">Browse and search {totalItems.toLocaleString()} product classifications</p>
          <div className="flex gap-4 justify-center">
            <Link
              href={firstSegmentCode ? `/${firstSegmentCode}` : ROUTES.HOME}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 font-medium transition-colors"
            >
              Browse Categories
            </Link>
            <Link
              href={ROUTES.API}
              className="inline-flex items-center px-6 py-3 rounded-lg border border-fd-border hover:bg-fd-accent font-medium transition-colors"
            >
              API Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
