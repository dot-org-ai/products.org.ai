# products.org.ai

**Comprehensive Product Ontology for the Semantic Web**

A structured, machine-readable ontology of product types built on Schema.org and enriched with GS1 GPC, UNSPSC, Wikidata, and Wikipedia classifications.

## Overview

products.org.ai provides:

- **40,000+ Product Types** - Comprehensive coverage based on GS1 Global Product Classification
- **Multi-System Classification** - GS1 GPC, UNSPSC, Wikidata, and Wikipedia cross-references
- **Schema.org Compatible** - Extends standard Schema.org Product types
- **TypeScript-First** - Full TypeScript type definitions and runtime validation
- **Rich Metadata** - Detailed descriptions, properties, and examples for each type
- **Open Source** - CC BY-SA 4.0 licensed with full attribution

## Features

### Authoritative Classifications

- **GS1 GPC** - 4-level hierarchy (Segment > Family > Class > Brick)
- **UNSPSC** - United Nations Standard Products and Services Code
- **Wikidata** - Semantic knowledge graph references (Q-IDs)
- **Wikipedia** - Human-readable documentation and descriptions

### Product Coverage

Sample product categories include:

- **Technology** - Computers, smartphones, electronics
- **Beauty & Personal Care** - Cosmetics, hygiene products, fragrances
- **Food & Beverage** - Groceries, beverages, specialty foods
- **Apparel & Footwear** - Clothing, shoes, accessories
- **Home & Garden** - Furniture, appliances, tools
- **Healthcare** - Medical devices, pharmaceuticals, wellness products
- **Automotive** - Vehicles, parts, accessories
- **Sports & Recreation** - Equipment, apparel, outdoor gear

## Installation

```bash
npm install products.org.ai
```

Or with other package managers:

```bash
yarn add products.org.ai
pnpm add products.org.ai
bun add products.org.ai
```

## Usage

### TypeScript

```typescript
import { $ } from 'products.org.ai'

// Create a product instance
const laptop = $.LaptopComputer.create({
  name: 'ThinkPad X1 Carbon Gen 11',
  description: 'Business ultrabook with Intel Core i7',
  brand: 'ThinkPad',
  manufacturer: 'Lenovo',
  model: 'Gen 11',
  productID: 'X1-2024-001'
})

// Access GPC classification
console.log(laptop.gpc.segmentName) // "Technology/Computers"
console.log(laptop.gpc.brickName)   // "Laptop Computers"

// Query products
const allLaptops = $.LaptopComputer.find()
const lenovoProducts = $.LaptopComputer.find({ manufacturer: 'Lenovo' })
```

### JavaScript

```javascript
const { $ } = require('products.org.ai')

const shampoo = $.Shampoo.create({
  name: 'Moisturizing Shampoo',
  brand: 'Example Brand',
  description: 'For dry and damaged hair'
})
```

### JSON-LD

All product types support JSON-LD serialization:

```typescript
const smartphone = $.Smartphone.create({
  name: 'iPhone 15 Pro',
  manufacturer: 'Apple Inc.',
  model: 'A2848'
})

const jsonld = smartphone.toJSONLD()
// {
//   "@context": "https://schema.org",
//   "@type": "Product",
//   "name": "iPhone 15 Pro",
//   "manufacturer": { "@type": "Organization", "name": "Apple Inc." },
//   "model": "A2848"
// }
```

## Documentation

### Product Type Structure

Each product type includes:

```yaml
---
$id: https://products.org.ai/{product-name}
$context: https://schema.org.ai
$type: Product
name: Product Name
description: Human-readable description
gpc:
  segment: "XX000000"
  segmentName: "Segment Name"
  family: "XXXX0000"
  familyName: "Family Name"
  class: "XXXXXX00"
  className: "Class Name"
  brick: "XXXXXXXX"
  brickName: "Brick Name"
unspsc: "XXXXXXXX"
wikidata: https://www.wikidata.org/wiki/QXXXXX
wikipedia: https://en.wikipedia.org/wiki/Product_Name
digital: 0.0-1.0
---
```

### Properties

All products inherit from Schema.org Product:

| Property | Type | Description |
|----------|------|-------------|
| name | Text | Product name |
| description | Text | Product description |
| brand | Brand \| Organization | Associated brand |
| manufacturer | Organization | Manufacturer |
| model | Text | Model identifier |
| productID | Text | Product identifier (GTIN, SKU, etc.) |
| category | Text \| Thing | Product category |
| image | URL | Product image |
| material | Text \| URL | Material composition |
| color | Text | Product color |

Extended properties:

| Property | Type | Description |
|----------|------|-------------|
| gpc | GPCClassification | GS1 GPC hierarchy |
| unspsc | Text | UNSPSC code |
| wikidata | URL | Wikidata Q-ID |
| wikipedia | URL | Wikipedia article |
| digital | Number | Digital score (0-1) |

## Data Sources

This ontology integrates data from:

1. **GS1 GPC** - Global Product Classification
   - Official GS1 standards
   - License: Contact GS1 for commercial use
   - URL: https://www.gs1.org/standards/gpc

2. **UNSPSC** - UN Standard Products and Services Code
   - United Nations Development Programme
   - License: Free for use
   - URL: https://www.ungm.org/public/unspsc

3. **Wikidata** - Semantic knowledge base
   - Wikimedia Foundation
   - License: CC0 (Public Domain)
   - URL: https://www.wikidata.org

4. **Wikipedia** - Free encyclopedia
   - Wikimedia Foundation
   - License: CC BY-SA 3.0/4.0
   - URL: https://www.wikipedia.org

5. **Schema.org** - Structured data vocabulary
   - Schema.org Community
   - License: CC BY-SA 3.0
   - URL: https://schema.org

## Project Structure

```
products.org.ai/
├── types/           # Product type definitions (MDX)
│   ├── Product.mdx  # Base product type
│   └── generated/   # Generated product types
├── scripts/         # Generation and utility scripts
│   ├── wikidata-client.ts   # Wikidata SPARQL client
│   ├── gpc-parser.ts        # GS1 GPC parser
│   ├── mdx-generator.ts     # MDX generator
│   └── generate.ts          # Main generator
├── data/           # Source data files
└── docs/           # Additional documentation

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This ontology is licensed under **CC BY-SA 4.0** (Creative Commons Attribution-ShareAlike 4.0 International).

You are free to:
- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

Under the following terms:
- Attribution — Must give appropriate credit
- ShareAlike — Must distribute under same license

See [LICENSE](LICENSE) for full details.

## Attribution

When using this ontology, please include attribution to:

```
products.org.ai - https://products.org.ai
Based on GS1 GPC, UNSPSC, Wikidata, and Wikipedia data
```

## Related Projects

- **[schema.org.ai](https://github.com/dot-org-ai/schema.org.ai)** - Core schema ontology
- **[services.org.ai](https://github.com/dot-org-ai/services.org.ai)** - Service types ontology
- **[industries.org.ai](https://github.com/dot-org-ai/industries.org.ai)** - Industry classifications
- **[occupations.org.ai](https://github.com/dot-org-ai/occupations.org.ai)** - Job and occupation types

## Support

- Documentation: https://products.org.ai/docs
- Issues: https://github.com/dot-org-ai/products.org.ai/issues
- Discussions: https://github.com/dot-org-ai/products.org.ai/discussions

## Acknowledgments

Special thanks to:
- GS1 for the Global Product Classification system
- United Nations for UNSPSC
- Wikimedia Foundation for Wikidata and Wikipedia
- Schema.org community
- All contributors to this project

---

Built with ❤️ by the .org.ai team
