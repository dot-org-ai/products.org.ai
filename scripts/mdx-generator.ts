/**
 * MDX Generator for Products
 * Generates MDX type definitions for products
 */

import type { GPCBrick, GPCClassification } from './gpc-parser'
import type { WikidataProduct } from './wikidata-client'

export interface ProductMDXOptions {
  brick: GPCBrick
  classification: GPCClassification
  wikidata?: WikidataProduct
  digital?: number
  examples?: boolean
}

export class ProductMDXGenerator {
  /**
   * Generate MDX content for a product type
   */
  generate(options: ProductMDXOptions): string {
    const { brick, classification, wikidata, digital = 0.5, examples = true } = options

    // Generate frontmatter
    const frontmatter = this.generateFrontmatter(brick, classification, wikidata, digital)

    // Generate breadcrumb
    const breadcrumb = this.generateBreadcrumb(classification)

    // Generate title and description
    const title = `# ${brick.name}`
    const description = brick.description || wikidata?.description || `A ${brick.name.toLowerCase()} product.`

    // Generate properties section
    const properties = this.generatePropertiesSection()

    // Generate classification section
    const classificationSection = this.generateClassificationSection(classification, wikidata)

    // Generate examples section
    const examplesSection = examples ? this.generateExamplesSection(brick) : ''

    // Generate resources section
    const resources = this.generateResourcesSection(wikidata)

    // Combine all sections
    return `${frontmatter}

${breadcrumb}

${title}

${description}

${properties}

${classificationSection}

${examplesSection}

${resources}
`.trim()
  }

  /**
   * Generate YAML frontmatter
   */
  private generateFrontmatter(
    brick: GPCBrick,
    classification: GPCClassification,
    wikidata?: WikidataProduct,
    digital: number = 0.5
  ): string {
    const lines = [
      '---',
      `$id: https://products.org.ai/${this.toKebabCase(brick.name)}`,
      '$context: https://schema.org.ai',
      '$type: Product',
      `name: ${brick.name}`,
      `description: ${brick.description || 'Product type'}`,
    ]

    // Add GPC classification
    lines.push('gpc:')
    lines.push(`  segment: "${classification.segment}"`)
    lines.push(`  segmentName: "${classification.segmentName}"`)
    lines.push(`  family: "${classification.family}"`)
    lines.push(`  familyName: "${classification.familyName}"`)
    lines.push(`  class: "${classification.class}"`)
    lines.push(`  className: "${classification.className}"`)
    lines.push(`  brick: "${classification.brick}"`)
    lines.push(`  brickName: "${classification.brickName}"`)

    // Add Wikidata if available
    if (wikidata) {
      lines.push(`wikidata: https://www.wikidata.org/wiki/${wikidata.qid}`)
      if (wikidata.wikipedia) {
        lines.push(`wikipedia: ${wikidata.wikipedia}`)
      }
    }

    lines.push(`digital: ${digital}`)
    lines.push('category: Product')
    lines.push('---')

    return lines.join('\n')
  }

  /**
   * Generate breadcrumb navigation
   */
  private generateBreadcrumb(classification: GPCClassification): string {
    return `[Thing](https://schema.org.ai/Thing) > [Product](Product.mdx) > ${classification.segmentName}`
  }

  /**
   * Generate properties section
   */
  private generatePropertiesSection(): string {
    return `## Properties

| Property | Type | Description | Inherited From |
|----------|------|-------------|----------------|
| name | Text | The name of the product | Thing |
| description | Text | A description of the product | Thing |
| brand | Brand \\| Organization | The brand associated with the product | Product |
| manufacturer | Organization | The manufacturer of the product | Product |
| model | Text | The model of the product | Product |
| productID | Text | The product identifier | Product |
| category | Text \\| Thing | Category of the product | Product |
| material | Text \\| URL | Material the product is made from | Product |
| color | Text | The color of the product | Product |
| image | URL | An image of the product | Product |`
  }

  /**
   * Generate classification section
   */
  private generateClassificationSection(
    classification: GPCClassification,
    wikidata?: WikidataProduct
  ): string {
    const lines = ['## Classification', '']
    lines.push(`- **GS1 GPC**: ${classification.brick} (${classification.segmentName} > ${classification.familyName} > ${classification.className} > ${classification.brickName})`)

    if (wikidata) {
      lines.push(`- **Wikidata**: [${wikidata.qid}](https://www.wikidata.org/wiki/${wikidata.qid})`)
      if (wikidata.wikipedia) {
        const title = wikidata.wikipedia.split('/').pop()
        lines.push(`- **Wikipedia**: [${title}](${wikidata.wikipedia})`)
      }
    }

    return lines.join('\n')
  }

  /**
   * Generate examples section
   */
  private generateExamplesSection(brick: GPCBrick): string {
    const varName = this.toCamelCase(brick.name)

    return `## Examples

\`\`\`typescript
import { $ } from '@org.ai/products'

// Create a basic ${brick.name.toLowerCase()}
const ${varName} = $.${this.toPascalCase(brick.name)}.create({
  name: 'Example ${brick.name}',
  description: '${brick.description || 'Product description'}',
  brand: 'Example Brand',
  manufacturer: 'Example Manufacturer'
})

// With additional properties
const detailed${this.toPascalCase(brick.name)} = $.${this.toPascalCase(brick.name)}.create({
  name: 'Premium ${brick.name}',
  description: 'Premium version with enhanced features',
  brand: 'Premium Brand',
  manufacturer: 'Premium Manufacturer',
  model: 'PRO-2024',
  productID: 'PROD-12345',
  category: '${brick.class.name}',
  image: 'https://example.com/image.jpg'
})

// Query ${brick.name.toLowerCase()} products
const all${this.toPascalCase(brick.name)}s = $.${this.toPascalCase(brick.name)}.find()
\`\`\``
  }

  /**
   * Generate resources section
   */
  private generateResourcesSection(wikidata?: WikidataProduct): string {
    const lines = ['## Resources', '']
    lines.push('- [Schema.org Product](https://schema.org/Product)')
    lines.push('- [GS1 GPC Browser](https://gpc-browser.gs1.org/)')

    if (wikidata) {
      lines.push(`- [Wikidata: ${wikidata.label} (${wikidata.qid})](https://www.wikidata.org/wiki/${wikidata.qid})`)
      if (wikidata.wikipedia) {
        const title = wikidata.wikipedia.split('/').pop()
        lines.push(`- [Wikipedia: ${title}](${wikidata.wikipedia})`)
      }
    }

    return lines.join('\n')
  }

  /**
   * Convert string to kebab-case
   */
  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }

  /**
   * Convert string to camelCase
   */
  private toCamelCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/[\s_-]+/g, '')
  }

  /**
   * Convert string to PascalCase
   */
  private toPascalCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/[\s_-]+/g, '')
  }

  /**
   * Generate filename from product name
   */
  generateFilename(productName: string): string {
    return `${this.toPascalCase(productName)}.mdx`
  }
}

// Export singleton instance
export const mdxGenerator = new ProductMDXGenerator()
