#!/usr/bin/env node
/**
 * Generate Products (Fumadocs Structure - TitleCase)
 * Creates product MDX files with TitleCase names and (group) folders
 */

const fs = require('fs')
const path = require('path')

const BASE_DIR = path.join(__dirname, '..')

// Sample product data with TitleCase naming
const SAMPLE_PRODUCTS = [
  {
    name: 'Shampoo',
    titleCase: 'Shampoo',
    description: 'Hair cleaning and conditioning product designed to remove dirt, oil, and buildup from hair',
    category: 'BeautyPersonalCare',
    categoryDisplay: 'Beauty Personal Care',
    subcategory: 'HairCare',
    subcategoryDisplay: 'Hair Care',
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
    titleCase: 'LaptopComputer',
    description: 'Portable personal computer with integrated screen, keyboard, and battery',
    category: 'TechnologyComputers',
    categoryDisplay: 'Technology Computers',
    subcategory: 'Computers',
    subcategoryDisplay: 'Computers',
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
    titleCase: 'Smartphone',
    description: 'Mobile phone with advanced computing capabilities and touchscreen interface',
    category: 'TechnologyComputers',
    categoryDisplay: 'Technology Computers',
    subcategory: 'MobileDevices',
    subcategoryDisplay: 'Mobile Devices',
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
    titleCase: 'Coffee',
    description: 'Roasted coffee beans or ground coffee for brewing beverages',
    category: 'FoodBeverage',
    categoryDisplay: 'Food Beverage',
    subcategory: 'CoffeeTea',
    subcategoryDisplay: 'Coffee Tea',
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
    titleCase: 'RunningShoes',
    description: 'Athletic footwear designed specifically for running and jogging',
    category: 'ApparelFootwear',
    categoryDisplay: 'Apparel Footwear',
    subcategory: 'AthleticFootwear',
    subcategoryDisplay: 'Athletic Footwear',
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
  const camelName = product.titleCase.charAt(0).toLowerCase() + product.titleCase.slice(1)

  return `---
title: ${product.name}
description: ${product.description}
---

import { Tabs, Tab } from 'fumadocs-ui/components/tabs'
import { Callout } from 'fumadocs-ui/components/callout'

# ${product.name}

${product.description}

## Classification

<Tabs items={['GS1 GPC', 'UNSPSC', 'Wikidata']}>
  <Tab value="GS1 GPC">
    - **Segment**: ${product.gpc.segment} - ${product.gpc.segmentName}
    - **Family**: ${product.gpc.family} - ${product.gpc.familyName}
    - **Class**: ${product.gpc.class} - ${product.gpc.className}
    - **Brick**: ${product.gpc.brick} - ${product.gpc.brickName}
  </Tab>
  <Tab value="UNSPSC">
    **Code**: ${product.unspsc}
  </Tab>
  <Tab value="Wikidata">
    - **QID**: [${product.wikidata}](https://www.wikidata.org/wiki/${product.wikidata})
    - **Wikipedia**: [${product.name}](${product.wikipedia})
  </Tab>
</Tabs>

## Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| name | string | Product name | Yes |
| description | string | Product description | No |
| brand | string \\| Organization | Brand name | No |
| manufacturer | string \\| Organization | Manufacturer | No |
| model | string | Model identifier | No |
| productID | string | Product ID (GTIN, SKU) | No |
| category | string | Product category | No |
| image | string | Product image URL | No |
| material | string | Material composition | No |
| color | string | Product color | No |

## Usage

<Tabs items={['TypeScript', 'JavaScript', 'JSON-LD']}>
  <Tab value="TypeScript">
    \`\`\`typescript
    import { $ } from 'products.org.ai'

    // Create a basic ${product.name.toLowerCase()}
    const ${camelName} = $.${product.titleCase}.create({
      name: 'Example ${product.name}',
      description: '${product.description}',
      brand: 'Example Brand',
      manufacturer: 'Example Manufacturer'
    })

    // With additional properties
    const detailed${product.titleCase} = $.${product.titleCase}.create({
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
    const all${product.titleCase}s = $.${product.titleCase}.find()
    \`\`\`
  </Tab>
  <Tab value="JavaScript">
    \`\`\`javascript
    const { $ } = require('products.org.ai')

    const ${camelName} = $.${product.titleCase}.create({
      name: 'Example ${product.name}',
      brand: 'Example Brand'
    })
    \`\`\`
  </Tab>
  <Tab value="JSON-LD">
    \`\`\`json
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Example ${product.name}",
      "description": "${product.description}",
      "brand": {
        "@type": "Brand",
        "name": "Example Brand"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Example Manufacturer"
      }
    }
    \`\`\`
  </Tab>
</Tabs>

## Digital Score

<Callout type="info">
  **Digital Score**: ${product.digital} / 1.0

  This product has a ${product.digital >= 0.7 ? 'high' : product.digital >= 0.4 ? 'medium' : 'low'} digital presence score, indicating ${
    product.digital >= 0.7 ? 'strong digital/online characteristics' :
    product.digital >= 0.4 ? 'moderate digital integration' :
    'primarily physical product characteristics'
  }.
</Callout>

## Resources

- [Schema.org Product](https://schema.org/Product)
- [GS1 GPC Browser](https://gpc-browser.gs1.org/)
- [Wikidata: ${product.name} (${product.wikidata})](https://www.wikidata.org/wiki/${product.wikidata})
- [Wikipedia: ${product.name}](${product.wikipedia})
- [UNSPSC Code ${product.unspsc}](https://www.ungm.org/public/unspsc)
`
}

/**
 * Generate category index page
 */
function generateCategoryIndex(categoryName, categoryDisplay, products) {
  const subcategories = [...new Set(products.map(p => ({ name: p.subcategory, display: p.subcategoryDisplay })))]

  return `---
title: ${categoryDisplay}
description: Product types in the ${categoryDisplay} category
---

# ${categoryDisplay}

Browse product types in this category:

${subcategories.map(sub => {
  const subProducts = products.filter(p => p.subcategory === sub.name)
  return `## ${sub.display}\n\n${subProducts.map(p => `- [${p.name}](/${p.titleCase})`).join('\n')}`
}).join('\n\n')}

## Overview

This category includes products classified under GS1 GPC segment: **${products[0].gpc.segmentName}**

Total product types: ${products.length}
`
}

/**
 * Generate subcategory index page
 */
function generateSubcategoryIndex(categoryName, categoryDisplay, subcategoryName, subcategoryDisplay, products) {
  return `---
title: ${subcategoryDisplay}
description: Product types in ${subcategoryDisplay}
---

# ${subcategoryDisplay}

Product types in this subcategory:

${products.map(p => `- [${p.name}](/${p.titleCase})`).join('\n')}

## Classification

- **Category**: ${categoryDisplay}
- **Subcategory**: ${subcategoryDisplay}
- **GS1 GPC Class**: ${products[0].gpc.className}
`
}

/**
 * Main generation function
 */
function generateProducts() {
  console.log('🚀 Generating products with TitleCase and fumadocs structure...\n')

  let generated = 0

  // Group products by category and subcategory
  const categoryMap = new Map()

  for (const product of SAMPLE_PRODUCTS) {
    const categoryKey = product.category
    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, {
        display: product.categoryDisplay,
        subcategories: new Map()
      })
    }

    const category = categoryMap.get(categoryKey)
    const subcategoryKey = product.subcategory
    if (!category.subcategories.has(subcategoryKey)) {
      category.subcategories.set(subcategoryKey, {
        display: product.subcategoryDisplay,
        products: []
      })
    }

    category.subcategories.get(subcategoryKey).products.push(product)
  }

  // Generate files for each product
  for (const product of SAMPLE_PRODUCTS) {
    try {
      const categoryDir = `(${product.category})`
      const subcategoryDir = `(${product.subcategory})`
      const dirPath = path.join(BASE_DIR, categoryDir, subcategoryDir)

      // Ensure directory exists
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }

      // Generate product MDX with TitleCase filename
      const mdxContent = generateProductMDX(product)
      const filename = `${product.titleCase}.mdx`
      const filepath = path.join(dirPath, filename)

      fs.writeFileSync(filepath, mdxContent, 'utf-8')

      console.log(`✅ Generated: ${categoryDir}/${subcategoryDir}/${filename}`)
      console.log(`   → Slug: /${product.titleCase}`)
      generated++
    } catch (error) {
      console.error(`❌ Failed to generate ${product.name}:`, error.message)
    }
  }

  // Generate category index pages
  for (const [categoryKey, categoryData] of categoryMap.entries()) {
    const categoryDir = path.join(BASE_DIR, `(${categoryKey})`)
    const allProducts = Array.from(categoryData.subcategories.values()).flatMap(s => s.products)
    const indexContent = generateCategoryIndex(categoryKey, categoryData.display, allProducts)
    const indexPath = path.join(categoryDir, 'index.mdx')

    fs.writeFileSync(indexPath, indexContent, 'utf-8')
    console.log(`✅ Generated: (${categoryKey})/index.mdx`)

    // Generate subcategory index pages
    for (const [subcategoryKey, subcategoryData] of categoryData.subcategories.entries()) {
      const subcategoryDir = path.join(categoryDir, `(${subcategoryKey})`)
      const subIndexContent = generateSubcategoryIndex(
        categoryKey,
        categoryData.display,
        subcategoryKey,
        subcategoryData.display,
        subcategoryData.products
      )
      const subIndexPath = path.join(subcategoryDir, 'index.mdx')

      fs.writeFileSync(subIndexPath, subIndexContent, 'utf-8')
      console.log(`✅ Generated: (${categoryKey})/(${subcategoryKey})/index.mdx`)
    }
  }

  console.log(`\n📊 Generation complete!`)
  console.log(`   ✅ Generated: ${generated} product types`)
  console.log(`   ✅ Generated: ${categoryMap.size} category indexes`)
  console.log(`   ✅ Generated: ${Array.from(categoryMap.values()).reduce((sum, c) => sum + c.subcategories.size, 0)} subcategory indexes`)
  console.log(`   📁 Structure: (Category)/(Subcategory)/TitleCase.mdx`)
  console.log(`   🔗 URLs: /TitleCase (groups don't affect slug)`)
}

// Run generator
if (require.main === module) {
  generateProducts()
}

module.exports = { generateProducts }
