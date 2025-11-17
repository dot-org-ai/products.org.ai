#!/usr/bin/env node
/**
 * Main Product Type Generator
 * Generates MDX files for all product types
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { gpcParser } from './gpc-parser'
import { mdxGenerator } from './mdx-generator'

const OUTPUT_DIR = join(__dirname, '..', 'types', 'generated')

/**
 * Generate all product type MDX files
 */
async function generateAllProducts() {
  console.log('🚀 Starting product type generation...\n')

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Get all bricks from GPC
  const bricks = gpcParser.getAllBricks()
  console.log(`📦 Found ${bricks.length} product types to generate\n`)

  let generated = 0
  let failed = 0

  for (const brick of bricks) {
    try {
      // Get classification
      const classification = gpcParser.getClassification(brick.code)
      if (!classification) {
        console.warn(`⚠️  No classification found for ${brick.name} (${brick.code})`)
        failed++
        continue
      }

      // Generate MDX content
      const mdxContent = mdxGenerator.generate({
        brick,
        classification,
        digital: calculateDigitalScore(brick),
        examples: true
      })

      // Generate filename
      const filename = mdxGenerator.generateFilename(brick.name)
      const filepath = join(OUTPUT_DIR, filename)

      // Write file
      writeFileSync(filepath, mdxContent, 'utf-8')

      console.log(`✅ Generated: ${filename}`)
      generated++
    } catch (error) {
      console.error(`❌ Failed to generate ${brick.name}:`, error)
      failed++
    }
  }

  console.log(`\n📊 Generation complete!`)
  console.log(`   ✅ Generated: ${generated}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log(`   📁 Output: ${OUTPUT_DIR}`)
}

/**
 * Calculate digital score based on product segment
 */
function calculateDigitalScore(brick: any): number {
  const segmentCode = brick.class.family.segment.code

  // Technology/Computers = high digital score
  if (segmentCode === '40000000') return 0.9

  // Software/Digital products = maximum digital score
  if (brick.name.toLowerCase().includes('software') ||
      brick.name.toLowerCase().includes('digital') ||
      brick.name.toLowerCase().includes('app')) {
    return 1.0
  }

  // Personal care/hygiene = low digital score
  if (segmentCode === '50000000') return 0.2

  // Food/Beverage = very low digital score
  if (segmentCode === '10000000') return 0.1

  // Default medium-low score
  return 0.4
}

// Run generator if executed directly
if (require.main === module) {
  generateAllProducts().catch(console.error)
}

export { generateAllProducts }
