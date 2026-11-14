import { segments, type SegmentMeta } from 'products.org.ai'
import { ESTIMATED_BRICKS_PER_FAMILY } from './constants'

/**
 * Validate and sanitize a segment code from URL parameters
 * @param code - The raw segment code from URL
 * @returns Sanitized code or null if invalid
 */
export function validateSegmentCode(code: string): string | null {
  // Segment codes should be numeric strings (e.g., "10000000")
  const sanitized = code.trim()

  // Check if it matches expected pattern (8 digits)
  if (!/^\d{8}$/.test(sanitized)) {
    return null
  }

  return sanitized
}

/**
 * Find a segment by its code with validation
 * @param code - The segment code to find
 * @returns The segment metadata or undefined if not found
 */
export function findSegmentByCode(code: string): SegmentMeta | undefined {
  const validCode = validateSegmentCode(code)
  if (!validCode) {
    return undefined
  }

  return segments.find((s) => s.code === validCode)
}

/**
 * Calculate total number of product classifications (bricks)
 * @returns Estimated total (familyCount * ESTIMATED_BRICKS_PER_FAMILY)
 * @note This is an estimation based on GPC data; actual counts may vary
 */
export function calculateTotalItems(): number {
  return segments.reduce((total, segment) => {
    // Safely handle undefined familyCount
    const familyCount = segment.familyCount ?? 0
    return total + familyCount * ESTIMATED_BRICKS_PER_FAMILY
  }, 0)
}

/**
 * Pre-computed total items at build time for performance
 * Avoids recalculating on every page load
 */
export const TOTAL_ITEMS = calculateTotalItems()

/**
 * Format family count with proper pluralization
 * @param count - The family count (may be undefined)
 * @returns Formatted string like "5 families" or "1 family"
 */
export function formatFamilyCount(count: number | undefined): string {
  const safeCount = count ?? 0
  return `${safeCount} ${safeCount === 1 ? 'family' : 'families'}`
}
