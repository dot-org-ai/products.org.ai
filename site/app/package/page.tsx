import { createPackagePage } from 'do.org.ai'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Package - Products.org.ai',
  description: 'TypeScript SDK for GS1 Global Product Classification (GPC)',
}

export default function PackagePage() {
  return createPackagePage({
    namespace: 'products',
    title: 'Products.org.ai',
    packageName: 'products.org.ai',
    description: 'TypeScript SDK for accessing GS1 Global Product Classification (GPC) data with full type safety and auto-completion',
    npmUrl: 'https://www.npmjs.com/package/products.org.ai',
    githubUrl: 'https://github.com/dot-do/platform/tree/main/ai/packages/products.org.ai',
  })
}
