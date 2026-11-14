/**
 * Product hierarchy metadata
 * Tree-shakable export containing only category structure (no full product data)
 * This file can be safely imported at build time without loading 48k products
 */

export interface SegmentMeta {
  code: string
  name: string
  familyCount: number
}

export interface FamilyMeta {
  code: string
  name: string
  segmentCode: string
  classCount: number
}

// Segment metadata (40 segments)
export const segments: readonly SegmentMeta[] = [
  { code: '10000000', name: 'Pet care & Food', familyCount: 2 },
  { code: '47000000', name: 'Cleaning & Hygiene product', familyCount: 12 },
  { code: '50000000', name: 'Food/Beverage/Tobacco', familyCount: 45 },
  { code: '51000000', name: 'Healthcare', familyCount: 18 },
  { code: '53000000', name: 'Beauty/Personal care/Hygiene', familyCount: 31 },
  { code: '58000000', name: 'Cross segment', familyCount: 1 },
  { code: '60000000', name: 'Textual/Printed/Reference material', familyCount: 5 },
  { code: '61000000', name: 'Music', familyCount: 2 },
  { code: '62000000', name: 'Stationery/Office machinery/Occasion supply', familyCount: 11 },
  { code: '63000000', name: 'Footwear', familyCount: 12 },
  { code: '64000000', name: 'Personal accessory', familyCount: 16 },
  { code: '65000000', name: 'Computing', familyCount: 11 },
  { code: '66000000', name: 'Communication', familyCount: 3 },
  { code: '67000000', name: 'Clothing', familyCount: 47 },
  { code: '68000000', name: 'Audiovisual/Photography', familyCount: 11 },
  { code: '70000000', name: 'Arts/Crafts/Needlework', familyCount: 14 },
  { code: '71000000', name: 'Sports equipment', familyCount: 17 },
  { code: '72000000', name: 'Home appliance', familyCount: 11 },
  { code: '73000000', name: 'Kitchenware and tableware', familyCount: 16 },
  { code: '74000000', name: 'Camping', familyCount: 3 },
  { code: '75000000', name: 'Household/Office furniture/Furnishing', familyCount: 10 },
  { code: '77000000', name: 'Vehicle', familyCount: 16 },
  { code: '78000000', name: 'Electrical supply', familyCount: 12 },
  { code: '79000000', name: 'Plumbing/Heating/Ventilation/Air conditioning', familyCount: 6 },
  { code: '80000000', name: 'Tools/Equipment hand', familyCount: 19 },
  { code: '81000000', name: 'Lawn/Garden supply', familyCount: 13 },
  { code: '82000000', name: 'Tools/Equipment power', familyCount: 13 },
  { code: '83000000', name: 'Building product', familyCount: 19 },
  { code: '84000000', name: 'Tool storage/Workshop aid', familyCount: 6 },
  { code: '85000000', name: 'Safety/Protection (diy)', familyCount: 9 },
  { code: '86000000', name: 'Toys/Game', familyCount: 25 },
  { code: '87000000', name: 'Fuels/Gas', familyCount: 3 },
  { code: '88000000', name: 'Lubricant', familyCount: 3 },
  { code: '89000000', name: 'Live animal', familyCount: 7 },
  { code: '91000000', name: 'Safety/Security/Surveillance', familyCount: 5 },
  { code: '92000000', name: 'Storage/Haulage container', familyCount: 5 },
  { code: '93000000', name: 'Horticulture (plant)', familyCount: 3 },
  { code: '94000000', name: 'Crop', familyCount: 1 },
  { code: '95000000', name: 'Service', familyCount: 17 },
  { code: '96000000', name: 'Monetary asset', familyCount: 1 },
] as const

/**
 * Get total product count without loading data
 * @returns Estimated total number of products (48,000)
 */
export function getProductCount(): number {
  return 48000
}

/**
 * Get lightweight product hierarchy metadata for navigation
 *
 * **IMPORTANT**: This returns ONLY segment metadata without loading product data.
 * Use this for navigation, counts, and build-time operations.
 *
 * For full hierarchy with all products loaded, use:
 * `import { buildFullProductHierarchy } from 'products.org.ai/client'`
 *
 * @returns Lightweight metadata with 40 segments (families array is empty)
 *
 * @example
 * ```ts
 * const meta = getProductHierarchyMetadata()
 * console.log(meta.segments.length) // 40 segments
 * console.log(meta.totalCount) // 48000
 * console.log(meta.segments[0].families) // [] (empty, no data loaded)
 * ```
 */
export function getProductHierarchyMetadata() {
  return {
    segments: segments.map(s => ({
      code: s.code,
      name: s.name,
      families: [], // Empty for now - can be populated on-demand
    })),
    totalCount: 48000
  }
}
