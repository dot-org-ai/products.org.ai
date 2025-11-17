#!/usr/bin/env node
/**
 * Generate Products (Flat Structure with Breadcrumbs)
 * All files in root directory with TitleCase names and breadcrumb navigation
 */

const fs = require('fs')
const path = require('path')

const BASE_DIR = path.join(__dirname, '..')

// Sample product data
const SAMPLE_PRODUCTS = [
  {
    name: 'Shampoo',
    titleCase: 'Shampoo',
    description: 'Hair cleaning and conditioning product designed to remove dirt, oil, and buildup from hair',
    category: { name: 'BeautyPersonalCare', display: 'Beauty Personal Care' },
    subcategory: { name: 'HairCare', display: 'Hair Care' },
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
    category: { name: 'TechnologyComputers', display: 'Technology Computers' },
    subcategory: { name: 'Computers', display: 'Computers' },
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
    category: { name: 'TechnologyComputers', display: 'Technology Computers' },
    subcategory: { name: 'MobileDevices', display: 'Mobile Devices' },
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
    category: { name: 'FoodBeverage', display: 'Food Beverage' },
    subcategory: { name: 'CoffeeTea', display: 'Coffee Tea' },
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
    category: { name: 'ApparelFootwear', display: 'Apparel Footwear' },
    subcategory: { name: 'AthleticFootwear', display: 'Athletic Footwear' },
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

import { Breadcrumb, BreadcrumbItem } from 'fumadocs-ui/components/breadcrumb'
import { Tabs, Tab } from 'fumadocs-ui/components/tabs'
import { Callout } from 'fumadocs-ui/components/callout'

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/${product.category.name}">${product.category.display}</BreadcrumbItem>
  <BreadcrumbItem href="/${product.subcategory.name}">${product.subcategory.display}</BreadcrumbItem>
  <BreadcrumbItem>${product.name}</BreadcrumbItem>
</Breadcrumb>

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
 * Generate category MDX page
 */
function generateCategoryMDX(category, products) {
  const subcategories = {}
  products.forEach(p => {
    if (!subcategories[p.subcategory.name]) {
      subcategories[p.subcategory.name] = {
        display: p.subcategory.display,
        products: []
      }
    }
    subcategories[p.subcategory.name].products.push(p)
  })

  return `---
title: ${category.display}
description: Product types in the ${category.display} category
---

import { Breadcrumb, BreadcrumbItem } from 'fumadocs-ui/components/breadcrumb'

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem>${category.display}</BreadcrumbItem>
</Breadcrumb>

# ${category.display}

Browse product types in this category:

${Object.entries(subcategories).map(([key, sub]) => `
## ${sub.display}

${sub.products.map(p => `- [${p.name}](/${p.titleCase})`).join('\n')}
`).join('\n')}

## Overview

This category includes products classified under GS1 GPC segment: **${products[0].gpc.segmentName}**

Total product types: ${products.length}
`
}

/**
 * Generate subcategory MDX page
 */
function generateSubcategoryMDX(category, subcategory, products) {
  return `---
title: ${subcategory.display}
description: Product types in ${subcategory.display}
---

import { Breadcrumb, BreadcrumbItem } from 'fumadocs-ui/components/breadcrumb'

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/${category.name}">${category.display}</BreadcrumbItem>
  <BreadcrumbItem>${subcategory.display}</BreadcrumbItem>
</Breadcrumb>

# ${subcategory.display}

Product types in this subcategory:

${products.map(p => `- [${p.name}](/${p.titleCase})`).join('\n')}

## Classification

- **Category**: ${category.display}
- **Subcategory**: ${subcategory.display}
- **GS1 GPC Class**: ${products[0].gpc.className}

Total products: ${products.length}
`
}

/**
 * Main generation function
 */
function generateProducts() {
  console.log('🚀 Generating products with FLAT structure and breadcrumbs...\n')

  let generated = 0

  // Group by category and subcategory
  const categoryMap = new Map()
  const subcategoryMap = new Map()

  for (const product of SAMPLE_PRODUCTS) {
    // Track categories
    if (!categoryMap.has(product.category.name)) {
      categoryMap.set(product.category.name, {
        display: product.category.display,
        products: []
      })
    }
    categoryMap.get(product.category.name).products.push(product)

    // Track subcategories
    const subKey = `${product.category.name}:${product.subcategory.name}`
    if (!subcategoryMap.has(subKey)) {
      subcategoryMap.set(subKey, {
        category: product.category,
        subcategory: product.subcategory,
        products: []
      })
    }
    subcategoryMap.get(subKey).products.push(product)
  }

  // Generate product files (flat in root)
  for (const product of SAMPLE_PRODUCTS) {
    try {
      const mdxContent = generateProductMDX(product)
      const filename = `${product.titleCase}.mdx`
      const filepath = path.join(BASE_DIR, filename)

      fs.writeFileSync(filepath, mdxContent, 'utf-8')

      console.log(`✅ Generated: ${filename}`)
      console.log(`   → URL: /${product.titleCase}`)
      console.log(`   → GitHub: /Smartphone (flat!)`)
      generated++
    } catch (error) {
      console.error(`❌ Failed to generate ${product.name}:`, error.message)
    }
  }

  // Generate category files (flat in root)
  for (const [categoryKey, categoryData] of categoryMap.entries()) {
    try {
      const mdxContent = generateCategoryMDX(
        { name: categoryKey, display: categoryData.display },
        categoryData.products
      )
      const filename = `${categoryKey}.mdx`
      const filepath = path.join(BASE_DIR, filename)

      fs.writeFileSync(filepath, mdxContent, 'utf-8')

      console.log(`✅ Generated: ${filename} (category)`)
      console.log(`   → URL: /${categoryKey}`)
    } catch (error) {
      console.error(`❌ Failed to generate category ${categoryKey}:`, error.message)
    }
  }

  // Generate subcategory files (flat in root)
  for (const [subKey, subData] of subcategoryMap.entries()) {
    try {
      const mdxContent = generateSubcategoryMDX(
        subData.category,
        subData.subcategory,
        subData.products
      )
      const filename = `${subData.subcategory.name}.mdx`
      const filepath = path.join(BASE_DIR, filename)

      fs.writeFileSync(filepath, mdxContent, 'utf-8')

      console.log(`✅ Generated: ${filename} (subcategory)`)
      console.log(`   → URL: /${subData.subcategory.name}`)
    } catch (error) {
      console.error(`❌ Failed to generate subcategory:`, error.message)
    }
  }

  console.log(`\n📊 Generation complete!`)
  console.log(`   ✅ Generated: ${generated} product types`)
  console.log(`   ✅ Generated: ${categoryMap.size} category pages`)
  console.log(`   ✅ Generated: ${subcategoryMap.size} subcategory pages`)
  console.log(`   📁 Structure: FLAT - all files in root`)
  console.log(`   🔗 URLs: /Smartphone, /LaptopComputer (flat!)`)
  console.log(`   🥖 Breadcrumbs: Clickable navigation on every page`)
  console.log(`   💾 GitHub: Direct links work - /Smartphone.mdx`)
}

// Run generator
if (require.main === module) {
  generateProducts()
}

module.exports = { generateProducts }
