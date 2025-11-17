#!/usr/bin/env tsx
/**
 * Enrich Products with Live Wikidata and Wikipedia Data
 *
 * This script:
 * 1. Reads existing product MDX files
 * 2. Extracts Wikidata Q-IDs from frontmatter
 * 3. Fetches live data from Wikidata (description, properties, images)
 * 4. Fetches Wikipedia content (summary, infobox data)
 * 5. Updates MDX files with enriched content
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql'
const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php'
const USER_AGENT = 'products.org.ai/1.0 (https://products.org.ai; enrichment script)'

interface WikidataEnrichment {
  qid: string
  label: string
  description: string
  image?: string
  officialWebsite?: string
  manufacturer?: string
  material?: string
  color?: string
  mass?: string
  dimensions?: string
  releaseDate?: string
  properties: Record<string, any>
}

interface WikipediaEnrichment {
  title: string
  summary: string
  fullUrl: string
  image?: string
  infobox?: Record<string, string>
}

class EnrichmentEngine {
  /**
   * Fetch Wikidata entity data
   */
  async fetchWikidataEntity(qid: string): Promise<WikidataEnrichment | null> {
    try {
      const sparql = `
        SELECT ?item ?itemLabel ?itemDescription
               ?image ?website ?manufacturer ?manufacturerLabel
               ?material ?materialLabel ?color ?colorLabel
               ?mass ?length ?width ?height ?inception
        WHERE {
          BIND(wd:${qid} AS ?item)

          OPTIONAL { ?item wdt:P18 ?image. }
          OPTIONAL { ?item wdt:P856 ?website. }
          OPTIONAL { ?item wdt:P176 ?manufacturer. }
          OPTIONAL { ?item wdt:P186 ?material. }
          OPTIONAL { ?item wdt:P462 ?color. }
          OPTIONAL { ?item wdt:P2067 ?mass. }
          OPTIONAL { ?item wdt:P2043 ?length. }
          OPTIONAL { ?item wdt:P2049 ?width. }
          OPTIONAL { ?item wdt:P2048 ?height. }
          OPTIONAL { ?item wdt:P571 ?inception. }

          SERVICE wikibase:label {
            bd:serviceParam wikibase:language "en".
            ?item rdfs:label ?itemLabel.
            ?item schema:description ?itemDescription.
          }
        }
        LIMIT 1
      `

      const url = new URL(WIKIDATA_ENDPOINT)
      url.searchParams.set('query', sparql)
      url.searchParams.set('format', 'json')

      const response = await fetch(url.toString(), {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'application/sparql-results+json'
        }
      })

      if (!response.ok) {
        console.error(`Wikidata fetch failed for ${qid}: ${response.statusText}`)
        return null
      }

      const data = await response.json()

      if (!data.results?.bindings?.[0]) {
        console.warn(`No data found for ${qid}`)
        return null
      }

      const binding = data.results.bindings[0]

      return {
        qid,
        label: binding.itemLabel?.value || '',
        description: binding.itemDescription?.value || '',
        image: binding.image?.value,
        officialWebsite: binding.website?.value,
        manufacturer: binding.manufacturerLabel?.value,
        material: binding.materialLabel?.value,
        color: binding.colorLabel?.value,
        mass: binding.mass?.value,
        releaseDate: binding.inception?.value,
        dimensions: this.formatDimensions(binding),
        properties: binding
      }
    } catch (error) {
      console.error(`Error fetching Wikidata for ${qid}:`, error)
      return null
    }
  }

  /**
   * Fetch Wikipedia page data
   */
  async fetchWikipediaPage(title: string): Promise<WikipediaEnrichment | null> {
    try {
      const url = new URL(WIKIPEDIA_API)
      url.searchParams.set('action', 'query')
      url.searchParams.set('format', 'json')
      url.searchParams.set('titles', title)
      url.searchParams.set('prop', 'extracts|pageimages|info')
      url.searchParams.set('exintro', '1')
      url.searchParams.set('explaintext', '1')
      url.searchParams.set('piprop', 'original')
      url.searchParams.set('inprop', 'url')

      const response = await fetch(url.toString(), {
        headers: {
          'User-Agent': USER_AGENT
        }
      })

      if (!response.ok) {
        console.error(`Wikipedia fetch failed for ${title}: ${response.statusText}`)
        return null
      }

      const data = await response.json()
      const pages = data.query?.pages
      const page = pages ? Object.values(pages)[0] as any : null

      if (!page || page.missing) {
        console.warn(`Wikipedia page not found: ${title}`)
        return null
      }

      return {
        title: page.title,
        summary: page.extract || '',
        fullUrl: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
        image: page.original?.source,
        infobox: {} // TODO: Parse infobox from HTML if needed
      }
    } catch (error) {
      console.error(`Error fetching Wikipedia for ${title}:`, error)
      return null
    }
  }

  /**
   * Format dimensions from Wikidata bindings
   */
  private formatDimensions(binding: any): string | undefined {
    const length = binding.length?.value
    const width = binding.width?.value
    const height = binding.height?.value

    if (!length && !width && !height) return undefined

    const parts = []
    if (length) parts.push(`L: ${length}`)
    if (width) parts.push(`W: ${width}`)
    if (height) parts.push(`H: ${height}`)

    return parts.join(', ')
  }

  /**
   * Enrich a single product file
   */
  async enrichProduct(filePath: string): Promise<boolean> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content: mdxContent } = matter(content)

      // Skip if no Wikidata QID
      const wikidataMatch = mdxContent.match(/\[Q\d+\]\(https:\/\/www\.wikidata\.org\/wiki\/(Q\d+)\)/)
      if (!wikidataMatch) {
        console.log(`⏭️  Skipping ${path.basename(filePath)} - no Wikidata QID found`)
        return false
      }

      const qid = wikidataMatch[1]
      console.log(`\n📦 Enriching ${frontmatter.title} (${qid})...`)

      // Fetch Wikidata enrichment
      const wikidataData = await this.fetchWikidataEntity(qid)
      if (!wikidataData) {
        console.log(`  ❌ Failed to fetch Wikidata data`)
        return false
      }

      console.log(`  ✅ Fetched Wikidata: ${wikidataData.description}`)
      if (wikidataData.image) console.log(`  🖼️  Image: ${wikidataData.image}`)
      if (wikidataData.manufacturer) console.log(`  🏭 Manufacturer: ${wikidataData.manufacturer}`)

      // Fetch Wikipedia enrichment
      let wikipediaData: WikipediaEnrichment | null = null
      const wikipediaMatch = mdxContent.match(/\[Wikipedia\]: \((https:\/\/en\.wikipedia\.org\/wiki\/([^)]+))\)/)
      if (wikipediaMatch) {
        const wikipediaTitle = decodeURIComponent(wikipediaMatch[2].replace(/_/g, ' '))
        wikipediaData = await this.fetchWikipediaPage(wikipediaTitle)
        if (wikipediaData) {
          console.log(`  📖 Wikipedia summary: ${wikipediaData.summary.substring(0, 80)}...`)
        }
      }

      // Generate enriched MDX content
      const enrichedContent = this.generateEnrichedMDX(mdxContent, wikidataData, wikipediaData)

      // Write back to file
      const newContent = matter.stringify(enrichedContent, frontmatter)
      fs.writeFileSync(filePath, newContent)

      console.log(`  ✅ Enriched ${path.basename(filePath)}`)
      return true
    } catch (error) {
      console.error(`Error enriching ${filePath}:`, error)
      return false
    }
  }

  /**
   * Generate enriched MDX content
   */
  private generateEnrichedMDX(
    originalContent: string,
    wikidata: WikidataEnrichment,
    wikipedia: WikipediaEnrichment | null
  ): string {
    // Find the position after the heading
    const headingMatch = originalContent.match(/(# .+\n\n)/)
    if (!headingMatch) return originalContent

    const headingEnd = headingMatch.index! + headingMatch[0].length

    // Build enriched description section
    let enrichedSection = ''

    // Add Wikidata description
    if (wikidata.description) {
      enrichedSection += `${wikidata.description}\n\n`
    }

    // Add Wikipedia summary if available
    if (wikipedia?.summary) {
      const summaryParagraph = wikipedia.summary.split('\n')[0] // First paragraph only
      if (summaryParagraph && summaryParagraph !== wikidata.description) {
        enrichedSection += `## Overview\n\n${summaryParagraph}\n\n`
      }
    }

    // Add properties section if we have interesting data
    const hasProperties = wikidata.manufacturer || wikidata.material || wikidata.color || wikidata.mass || wikidata.dimensions
    if (hasProperties) {
      enrichedSection += `## Properties\n\n`

      if (wikidata.manufacturer) {
        enrichedSection += `- **Manufacturer**: ${wikidata.manufacturer}\n`
      }
      if (wikidata.material) {
        enrichedSection += `- **Material**: ${wikidata.material}\n`
      }
      if (wikidata.color) {
        enrichedSection += `- **Color**: ${wikidata.color}\n`
      }
      if (wikidata.mass) {
        enrichedSection += `- **Mass**: ${wikidata.mass}\n`
      }
      if (wikidata.dimensions) {
        enrichedSection += `- **Dimensions**: ${wikidata.dimensions}\n`
      }
      if (wikidata.releaseDate) {
        enrichedSection += `- **Release Date**: ${wikidata.releaseDate}\n`
      }
      if (wikidata.officialWebsite) {
        enrichedSection += `- **Official Website**: [${wikidata.officialWebsite}](${wikidata.officialWebsite})\n`
      }

      enrichedSection += `\n`
    }

    // Add image if available
    if (wikidata.image || wikipedia?.image) {
      const imageUrl = wikidata.image || wikipedia!.image
      enrichedSection += `## Image\n\n![${wikidata.label}](${imageUrl})\n\n`
    }

    // Insert enriched section after heading, before existing description
    const beforeHeading = originalContent.substring(0, headingEnd)
    const afterDescription = originalContent.substring(headingEnd)

    // Remove the old basic description line if it exists
    const descriptionRegex = /^.+ - .+ product\n\n/
    const cleanAfterDescription = afterDescription.replace(descriptionRegex, '')

    return beforeHeading + enrichedSection + cleanAfterDescription
  }

  /**
   * Enrich all product files in directory
   */
  async enrichAllProducts(productsDir: string): Promise<void> {
    const files = fs.readdirSync(productsDir)
      .filter(f => f.endsWith('.mdx'))
      .filter(f => !f.match(/^[A-Z][a-z]+[A-Z]/) && !f.match(/^(Technology|Beauty|Food|Apparel|Mobile|Hair|Skin|Coffee|Athletic)/)) // Only product files, not categories
      .map(f => path.join(productsDir, f))

    console.log(`🚀 Enriching ${files.length} product files...\n`)

    let enriched = 0
    let failed = 0

    for (const file of files) {
      const success = await this.enrichProduct(file)
      if (success) {
        enriched++
      } else {
        failed++
      }

      // Rate limiting - be nice to Wikidata/Wikipedia
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log(`\n✅ Enrichment complete!`)
    console.log(`   Enriched: ${enriched} products`)
    console.log(`   Failed: ${failed} products`)
  }
}

// Main execution
const productsDir = path.join(__dirname, '..')
const engine = new EnrichmentEngine()

engine.enrichAllProducts(productsDir)
  .catch(error => {
    console.error('Enrichment failed:', error)
    process.exit(1)
  })
