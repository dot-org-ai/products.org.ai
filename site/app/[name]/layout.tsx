import { createDocsLayout } from 'do.org.ai/app/create-docs-layout'
import { getProductHierarchyMetadata } from 'products.org.ai/metadata'

const config = {
  namespace: 'products',
  title: 'Products.org.ai',
  description: 'GS1 Global Product Classification (GPC)',
}

function buildPageTree() {
  const hierarchy = getProductHierarchyMetadata()

  return {
    name: 'Products',
    children: hierarchy.segments.map((segment) => ({
      type: 'folder' as const,
      name: segment.name,
      index: {
        title: segment.name,
        url: `/${segment.code}`,
      },
      children: segment.families.slice(0, 20).map((family) => ({
        type: 'page' as const,
        name: family.name,
        url: `/${family.code}`,
      })),
    })),
  }
}

export default createDocsLayout({
  config,
  buildPageTree: buildPageTree as any,
})
