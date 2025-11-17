#!/usr/bin/env node
/**
 * Generate Expanded Products (Testing at Scale)
 * Generates a larger set of products to test the flat structure
 */

const fs = require('fs')
const path = require('path')

const BASE_DIR = path.join(__dirname, '..')

// Expanded product data - simulating real-world diversity
const PRODUCTS = [
  // Technology/Computers - Mobile Devices
  { name: 'Smartphone', titleCase: 'Smartphone', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'MobileDevices', display: 'Mobile Devices' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211600', className: 'Mobile Devices', brick: '43211601', brickName: 'Smartphones' }, unspsc: '43191501', wikidata: 'Q22645', wikipedia: 'https://en.wikipedia.org/wiki/Smartphone', digital: 1.0 },
  { name: 'Tablet', titleCase: 'Tablet', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'MobileDevices', display: 'Mobile Devices' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211600', className: 'Mobile Devices', brick: '43211602', brickName: 'Tablets' }, unspsc: '43211508', wikidata: 'Q155972', wikipedia: 'https://en.wikipedia.org/wiki/Tablet_computer', digital: 0.95 },
  { name: 'Smartwatch', titleCase: 'Smartwatch', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'MobileDevices', display: 'Mobile Devices' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211600', className: 'Mobile Devices', brick: '43211603', brickName: 'Smartwatches' }, unspsc: '43191502', wikidata: 'Q28134774', wikipedia: 'https://en.wikipedia.org/wiki/Smartwatch', digital: 1.0 },

  // Technology/Computers - Computers
  { name: 'Laptop Computer', titleCase: 'LaptopComputer', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'Computers', display: 'Computers' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211500', className: 'Computers', brick: '43211501', brickName: 'Laptop Computers' }, unspsc: '43211503', wikidata: 'Q3962', wikipedia: 'https://en.wikipedia.org/wiki/Laptop', digital: 0.9 },
  { name: 'Desktop Computer', titleCase: 'DesktopComputer', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'Computers', display: 'Computers' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211500', className: 'Computers', brick: '43211502', brickName: 'Desktop Computers' }, unspsc: '43211502', wikidata: 'Q35489', wikipedia: 'https://en.wikipedia.org/wiki/Desktop_computer', digital: 0.85 },
  { name: 'Server', titleCase: 'Server', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'Computers', display: 'Computers' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211500', className: 'Computers', brick: '43211503', brickName: 'Servers' }, unspsc: '43211507', wikidata: 'Q44127', wikipedia: 'https://en.wikipedia.org/wiki/Server_(computing)', digital: 0.95 },

  // Technology/Computers - Peripherals
  { name: 'Computer Monitor', titleCase: 'ComputerMonitor', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'Peripherals', display: 'Peripherals' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211700', className: 'Peripherals', brick: '43211701', brickName: 'Monitors' }, unspsc: '43191501', wikidata: 'Q5300', wikipedia: 'https://en.wikipedia.org/wiki/Computer_monitor', digital: 0.7 },
  { name: 'Computer Keyboard', titleCase: 'ComputerKeyboard', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'Peripherals', display: 'Peripherals' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211700', className: 'Peripherals', brick: '43211702', brickName: 'Keyboards' }, unspsc: '43211708', wikidata: 'Q7190', wikipedia: 'https://en.wikipedia.org/wiki/Computer_keyboard', digital: 0.6 },
  { name: 'Computer Mouse', titleCase: 'ComputerMouse', category: { name: 'TechnologyComputers', display: 'Technology Computers' }, subcategory: { name: 'Peripherals', display: 'Peripherals' }, gpc: { segment: '40000000', segmentName: 'Technology/Computers', family: '43210000', familyName: 'Computer Equipment and Accessories', class: '43211700', className: 'Peripherals', brick: '43211703', brickName: 'Mice' }, unspsc: '43211707', wikidata: 'Q6669', wikipedia: 'https://en.wikipedia.org/wiki/Computer_mouse', digital: 0.6 },

  // Beauty/Personal Care - Hair Care
  { name: 'Shampoo', titleCase: 'Shampoo', category: { name: 'BeautyPersonalCare', display: 'Beauty Personal Care' }, subcategory: { name: 'HairCare', display: 'Hair Care' }, gpc: { segment: '50000000', segmentName: 'Beauty/Personal Care/Hygiene', family: '50100000', familyName: 'Personal Hygiene Products', class: '50101500', className: 'Hair Care', brick: '50101501', brickName: 'Shampoo' }, unspsc: '53131601', wikidata: 'Q163670', wikipedia: 'https://en.wikipedia.org/wiki/Shampoo', digital: 0.2 },
  { name: 'Conditioner', titleCase: 'Conditioner', category: { name: 'BeautyPersonalCare', display: 'Beauty Personal Care' }, subcategory: { name: 'HairCare', display: 'Hair Care' }, gpc: { segment: '50000000', segmentName: 'Beauty/Personal Care/Hygiene', family: '50100000', familyName: 'Personal Hygiene Products', class: '50101500', className: 'Hair Care', brick: '50101502', brickName: 'Conditioner' }, unspsc: '53131602', wikidata: 'Q1131151', wikipedia: 'https://en.wikipedia.org/wiki/Hair_conditioner', digital: 0.2 },
  { name: 'Hair Dryer', titleCase: 'HairDryer', category: { name: 'BeautyPersonalCare', display: 'Beauty Personal Care' }, subcategory: { name: 'HairCare', display: 'Hair Care' }, gpc: { segment: '50000000', segmentName: 'Beauty/Personal Care/Hygiene', family: '50100000', familyName: 'Personal Hygiene Products', class: '50101500', className: 'Hair Care', brick: '50101503', brickName: 'Hair Dryers' }, unspsc: '53131603', wikidata: 'Q184508', wikipedia: 'https://en.wikipedia.org/wiki/Hair_dryer', digital: 0.4 },

  // Beauty/Personal Care - Skin Care
  { name: 'Facial Cleanser', titleCase: 'FacialCleanser', category: { name: 'BeautyPersonalCare', display: 'Beauty Personal Care' }, subcategory: { name: 'SkinCare', display: 'Skin Care' }, gpc: { segment: '50000000', segmentName: 'Beauty/Personal Care/Hygiene', family: '50100000', familyName: 'Personal Hygiene Products', class: '50101600', className: 'Skin Care', brick: '50101601', brickName: 'Facial Cleansers' }, unspsc: '53131701', wikidata: 'Q7272975', wikipedia: 'https://en.wikipedia.org/wiki/Facial', digital: 0.2 },
  { name: 'Moisturizer', titleCase: 'Moisturizer', category: { name: 'BeautyPersonalCare', display: 'Beauty Personal Care' }, subcategory: { name: 'SkinCare', display: 'Skin Care' }, gpc: { segment: '50000000', segmentName: 'Beauty/Personal Care/Hygiene', family: '50100000', familyName: 'Personal Hygiene Products', class: '50101600', className: 'Skin Care', brick: '50101602', brickName: 'Moisturizers' }, unspsc: '53131702', wikidata: 'Q1425089', wikipedia: 'https://en.wikipedia.org/wiki/Moisturizer', digital: 0.2 },
  { name: 'Sunscreen', titleCase: 'Sunscreen', category: { name: 'BeautyPersonalCare', display: 'Beauty Personal Care' }, subcategory: { name: 'SkinCare', display: 'Skin Care' }, gpc: { segment: '50000000', segmentName: 'Beauty/Personal Care/Hygiene', family: '50100000', familyName: 'Personal Hygiene Products', class: '50101600', className: 'Skin Care', brick: '50101603', brickName: 'Sunscreen' }, unspsc: '53131703', wikidata: 'Q177212', wikipedia: 'https://en.wikipedia.org/wiki/Sunscreen', digital: 0.2 },

  // Food/Beverage - Coffee/Tea
  { name: 'Coffee', titleCase: 'Coffee', category: { name: 'FoodBeverage', display: 'Food Beverage' }, subcategory: { name: 'CoffeeTea', display: 'Coffee Tea' }, gpc: { segment: '10000000', segmentName: 'Food/Beverage/Tobacco', family: '10100000', familyName: 'Beverages', class: '10101000', className: 'Coffee and Tea', brick: '10101001', brickName: 'Coffee' }, unspsc: '50201713', wikidata: 'Q8486', wikipedia: 'https://en.wikipedia.org/wiki/Coffee', digital: 0.1 },
  { name: 'Tea', titleCase: 'Tea', category: { name: 'FoodBeverage', display: 'Food Beverage' }, subcategory: { name: 'CoffeeTea', display: 'Coffee Tea' }, gpc: { segment: '10000000', segmentName: 'Food/Beverage/Tobacco', family: '10100000', familyName: 'Beverages', class: '10101000', className: 'Coffee and Tea', brick: '10101002', brickName: 'Tea' }, unspsc: '50201714', wikidata: 'Q6097', wikipedia: 'https://en.wikipedia.org/wiki/Tea', digital: 0.1 },
  { name: 'Espresso Machine', titleCase: 'EspressoMachine', category: { name: 'FoodBeverage', display: 'Food Beverage' }, subcategory: { name: 'CoffeeTea', display: 'Coffee Tea' }, gpc: { segment: '10000000', segmentName: 'Food/Beverage/Tobacco', family: '10100000', familyName: 'Beverages', class: '10101000', className: 'Coffee and Tea', brick: '10101003', brickName: 'Coffee Makers' }, unspsc: '52141502', wikidata: 'Q211841', wikipedia: 'https://en.wikipedia.org/wiki/Espresso_machine', digital: 0.5 },

  // Apparel/Footwear - Athletic Footwear
  { name: 'Running Shoes', titleCase: 'RunningShoes', category: { name: 'ApparelFootwear', display: 'Apparel Footwear' }, subcategory: { name: 'AthleticFootwear', display: 'Athletic Footwear' }, gpc: { segment: '30000000', segmentName: 'Apparel/Footwear/Accessories', family: '30100000', familyName: 'Footwear', class: '30101000', className: 'Athletic Footwear', brick: '30101001', brickName: 'Running Shoes' }, unspsc: '53101608', wikidata: 'Q1155704', wikipedia: 'https://en.wikipedia.org/wiki/Running_shoe', digital: 0.3 },
  { name: 'Basketball Shoes', titleCase: 'BasketballShoes', category: { name: 'ApparelFootwear', display: 'Apparel Footwear' }, subcategory: { name: 'AthleticFootwear', display: 'Athletic Footwear' }, gpc: { segment: '30000000', segmentName: 'Apparel/Footwear/Accessories', family: '30100000', familyName: 'Footwear', class: '30101000', className: 'Athletic Footwear', brick: '30101002', brickName: 'Basketball Shoes' }, unspsc: '53101609', wikidata: 'Q27441', wikipedia: 'https://en.wikipedia.org/wiki/Sneakers', digital: 0.3 },
  { name: 'Training Shoes', titleCase: 'TrainingShoes', category: { name: 'ApparelFootwear', display: 'Apparel Footwear' }, subcategory: { name: 'AthleticFootwear', display: 'Athletic Footwear' }, gpc: { segment: '30000000', segmentName: 'Apparel/Footwear/Accessories', family: '30100000', familyName: 'Footwear', class: '30101000', className: 'Athletic Footwear', brick: '30101003', brickName: 'Training Shoes' }, unspsc: '53101610', wikidata: 'Q27441', wikipedia: 'https://en.wikipedia.org/wiki/Sneakers', digital: 0.3 }
]

// Include generate function from previous script
const generateProductMDX = (product) => {
  const description = `${product.gpc.brickName} - ${product.gpc.className} product`
  const camelName = product.titleCase.charAt(0).toLowerCase() + product.titleCase.slice(1)

  return `---
title: ${product.name}
description: ${description}
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

${description}

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

## Usage

<Tabs items={['TypeScript', 'JavaScript']}>
  <Tab value="TypeScript">
    \`\`\`typescript
    import { $ } from 'products.org.ai'

    const ${camelName} = $.${product.titleCase}.create({
      name: 'Example ${product.name}',
      brand: 'Example Brand'
    })
    \`\`\`
  </Tab>
  <Tab value="JavaScript">
    \`\`\`javascript
    const { $ } = require('products.org.ai')

    const ${camelName} = $.${product.titleCase}.create({
      name: 'Example ${product.name}'
    })
    \`\`\`
  </Tab>
</Tabs>

## Digital Score

<Callout type="info">
  **Digital Score**: ${product.digital} / 1.0
</Callout>
`
}

const generateCategoryMDX = (category, products) => {
  const subcategories = {}
  products.forEach(p => {
    if (!subcategories[p.subcategory.name]) {
      subcategories[p.subcategory.name] = { display: p.subcategory.display, products: [] }
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

${Object.entries(subcategories).map(([key, sub]) => `
## ${sub.display}

${sub.products.map(p => `- [${p.name}](/${p.titleCase})`).join('\n')}
`).join('\n')}

Total products: ${products.length}
`
}

const generateSubcategoryMDX = (category, subcategory, products) => {
  return `---
title: ${subcategory.display}
description: ${subcategory.display} products
---

import { Breadcrumb, BreadcrumbItem } from 'fumadocs-ui/components/breadcrumb'

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/${category.name}">${category.display}</BreadcrumbItem>
  <BreadcrumbItem>${subcategory.display}</BreadcrumbItem>
</Breadcrumb>

# ${subcategory.display}

${products.map(p => `- [${p.name}](/${p.titleCase})`).join('\n')}

Total: ${products.length}
`
}

function generate() {
  console.log(`🚀 Generating EXPANDED product set (${PRODUCTS.length} products)...\n`)

  let generated = 0
  const categoryMap = new Map()
  const subcategoryMap = new Map()

  // Group data
  for (const product of PRODUCTS) {
    if (!categoryMap.has(product.category.name)) {
      categoryMap.set(product.category.name, { display: product.category.display, products: [] })
    }
    categoryMap.get(product.category.name).products.push(product)

    const subKey = `${product.category.name}:${product.subcategory.name}`
    if (!subcategoryMap.has(subKey)) {
      subcategoryMap.set(subKey, { category: product.category, subcategory: product.subcategory, products: [] })
    }
    subcategoryMap.get(subKey).products.push(product)
  }

  // Generate products
  for (const product of PRODUCTS) {
    const mdx = generateProductMDX(product)
    const filepath = path.join(BASE_DIR, `${product.titleCase}.mdx`)
    fs.writeFileSync(filepath, mdx, 'utf-8')
    console.log(`✅ ${product.titleCase}.mdx`)
    generated++
  }

  // Generate categories
  for (const [key, data] of categoryMap.entries()) {
    const mdx = generateCategoryMDX({ name: key, display: data.display }, data.products)
    fs.writeFileSync(path.join(BASE_DIR, `${key}.mdx`), mdx, 'utf-8')
    console.log(`✅ ${key}.mdx (category)`)
  }

  // Generate subcategories
  for (const [key, data] of subcategoryMap.entries()) {
    const mdx = generateSubcategoryMDX(data.category, data.subcategory, data.products)
    fs.writeFileSync(path.join(BASE_DIR, `${data.subcategory.name}.mdx`), mdx, 'utf-8')
    console.log(`✅ ${data.subcategory.name}.mdx (subcategory)`)
  }

  console.log(`\n📊 Complete!`)
  console.log(`   ✅ Products: ${generated}`)
  console.log(`   ✅ Categories: ${categoryMap.size}`)
  console.log(`   ✅ Subcategories: ${subcategoryMap.size}`)
  console.log(`   📁 All flat in root directory`)
}

if (require.main === module) {
  generate()
}
