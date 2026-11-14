import { segments } from 'products.org.ai'
import { TOTAL_ITEMS } from '@/lib/segments'
import { HeroSection } from '@/components/home/hero-section'
import { ProductSegmentsGrid } from '@/components/home/product-segments-grid'
import { AboutSection } from '@/components/home/about-section'
import { StatsSection } from '@/components/home/stats-section'

export default async function HomePage() {
  // Validate segments data
  if (!segments || !Array.isArray(segments)) {
    throw new Error('Invalid segments data')
  }

  // Use pre-computed total for performance
  const totalItems = TOTAL_ITEMS
  const firstSegmentCode = segments.length > 0 ? segments[0].code : undefined

  return (
    <div className="min-h-screen">
      <HeroSection totalItems={totalItems} firstSegmentCode={firstSegmentCode} />
      <ProductSegmentsGrid segments={segments} />
      <AboutSection />
      <StatsSection segments={segments} totalItems={totalItems} />
    </div>
  )
}
