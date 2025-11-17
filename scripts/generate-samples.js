#!/usr/bin/env node
/**
 * Generate Sample Products
 * Creates sample product type MDX files
 */

const fs = require('fs')
const path = require('path')

const OUTPUT_DIR = path.join(__dirname, '..', 'types', 'generated')

// Sample product data with GS1 GPC classification
const SAMPLE_PRODUCTS = [
  {
    name: 'Shampoo',
    description: 'Hair cleaning and conditioning product designed to remove dirt, oil, and buildup from hair',
    gpc: {
      segment: '50000000',
      segmentName: 'Beauty/Personal Care/Hygiene',
      family: '50100000',
      familyName: 'Personal Hygiene Products',
      class: '50101500',
      className: 'Hair Care',
      brick: '50101501',
      brickName: 'Shampoo'
    },
    unspsc: '53131601',
    wikidata: 'Q163670',
    wikipedia: 'https://en.wikipedia.org/wiki/Shampoo',
    digital: 0.2
  },
  {
    name: 'Laptop Computer',
    description: 'Portable personal computer with integrated screen, keyboard, and battery',
    gpc: {
      segment: '40000000',
      segmentName: 'Technology/Computers',
      family: '43210000',
      familyName: 'Computer Equipment and Accessories',
      class: '43211500',
      className: 'Computers',
      brick: '43211501',
      brickName: 'Laptop Computers'
    },
    unspsc: '43211503',
    wikidata: 'Q3962',
    wikipedia: 'https://en.wikipedia.org/wiki/Laptop',
    digital: 0.9
  },
  {
    name: 'Smartphone',
    description: 'Mobile phone with advanced computing capabilities and touchscreen interface',
    gpc: {
      segment: '40000000',
      segmentName: 'Technology/Computers',
      family: '43210000',
      familyName: 'Computer Equipment and Accessories',
      class: '43211600',
      className: 'Mobile Devices',
      brick: '43211601',
      brickName: 'Smartphones'
    },
    unspsc: '43191501',
    wikidata: 'Q22645',
    wikipedia: 'https://en.wikipedia.org/wiki/Smartphone',
    digital: 1.0
  },
  {
    name: 'Coffee',
    description: 'Roasted coffee beans or ground coffee for brewing beverages',
    gpc: {
      segment: '10000000',
      segmentName: 'Food/Beverage/Tobacco',
      family: '10100000',
      familyName: 'Beverages',
      class: '10101000',
      className: 'Coffee and Tea',
      brick: '10101001',
      brickName: 'Coffee'
    },
    unspsc: '50201713',
    wikidata: 'Q8486',
    wikipedia: 'https://en.wikipedia.org/wiki/Coffee',
    digital: 0.1
  },
  {
    name: 'Running Shoes',
    description: 'Athletic footwear designed specifically for running and jogging',
    gpc: {
      segment: '30000000',
      segmentName: 'Apparel/Footwear/Accessories',
      family: '30100000',
      familyName: 'Footwear',
      class: '30101000',
      className: 'Athletic Footwear',
      brick: '30101001',
      brickName: 'Running Shoes'
    },
    unspsc: '53101608',
    wikidata: 'Q1155704',
    wikipedia: 'https://en.wikipedia.org/wiki/Running_shoe',
    digital: 0.3
  }
]

/**
 * Generate MDX for a product
 */
function generateProductMDX(product) {
  const kebabName = product.name.toLowerCase().replace(/\s+/g, '-')
  const pascalName = product.name.replace(/\s+/g, '')
  const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1)

  return `---
$id: https://products.org.ai/${kebabName}
$context: https://schema.org.ai
$type: Product
name: ${product.name}
description: ${product.description}
gpc:
  segment: "${product.gpc.segment}"
  segmentName: "${product.gpc.segmentName}"
  family: "${product.gpc.family}"
  familyName: "${product.gpc.familyName}"
  class: "${product.gpc.class}"
  className: "${product.gpc.className}"
  brick: "${product.gpc.brick}"
  brickName: "${product.gpc.brickName}"
unspsc: "${product.unspsc}"
wikidata: https://www.wikidata.org/wiki/${product.wikidata}
wikipedia: ${product.wikipedia}
digital: ${product.digital}
category: Product
---

[Thing](https://schema.org.ai/Thing) > [Product](../Product.mdx) > ${product.gpc.segmentName}

# ${product.name}

${product.description}

## Properties

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
| image | URL | An image of the product | Product |

## Classification

- **GS1 GPC**: ${product.gpc.brick} (${product.gpc.segmentName} > ${product.gpc.familyName} > ${product.gpc.className} > ${product.gpc.brickName})
- **UNSPSC**: ${product.unspsc}
- **Wikidata**: [${product.wikidata}](https://www.wikidata.org/wiki/${product.wikidata})
- **Wikipedia**: [${product.name}](${product.wikipedia})

## Examples

\`\`\`typescript
import { $ } from 'products.org.ai'

// Create a basic ${product.name.toLowerCase()}
const ${camelName} = $.${pascalName}.create({
  name: 'Example ${product.name}',
  description: '${product.description}',
  brand: 'Example Brand',
  manufacturer: 'Example Manufacturer'
})

// With additional properties
const detailed${pascalName} = $.${pascalName}.create({
  name: 'Premium ${product.name}',
  description: 'Premium version with enhanced features',
  brand: 'Premium Brand',
  manufacturer: 'Premium Manufacturer',
  model: 'PRO-2024',
  productID: 'PROD-12345',
  category: '${product.gpc.className}',
  image: 'https://example.com/image.jpg'
})

// Query ${product.name.toLowerCase()} products
const all${pascalName}s = $.${pascalName}.find()
\`\`\`

## Resources

- [Schema.org Product](https://schema.org/Product)
- [GS1 GPC Browser](https://gpc-browser.gs1.org/)
- [Wikidata: ${product.name} (${product.wikidata})](https://www.wikidata.org/wiki/${product.wikidata})
- [Wikipedia: ${product.name}](${product.wikipedia})
`
}

/**
 * Main generation function
 */
function generateSamples() {
  console.log('🚀 Generating sample product types...\n')

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  let generated = 0

  for (const product of SAMPLE_PRODUCTS) {
    try {
      const mdxContent = generateProductMDX(product)
      const filename = `${product.name.replace(/\s+/g, '')}.mdx`
      const filepath = path.join(OUTPUT_DIR, filename)

      fs.writeFileSync(filepath, mdxContent, 'utf-8')

      console.log(`✅ Generated: ${filename}`)
      generated++
    } catch (error) {
      console.error(`❌ Failed to generate ${product.name}:`, error.message)
    }
  }

  console.log(`\n📊 Generation complete!`)
  console.log(`   ✅ Generated: ${generated} product types`)
  console.log(`   📁 Output: ${OUTPUT_DIR}`)
}

// Run generator
if (require.main === module) {
  generateSamples()
}

module.exports = { generateSamples }
