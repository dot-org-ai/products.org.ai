import { createLayoutConfig } from 'do.org.ai/app/create-layout-config'
import { createFooter } from 'do.org.ai/app/create-footer'
import { Book } from 'lucide-react'
import { getProductHierarchyMetadata } from 'products.org.ai/metadata'

/**
 * Build sidebar page tree from product hierarchy
 * Shows Segments → Families (2 levels)
 * Individual products accessible via search or direct URL
 */
export function buildPageTree() {
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

const config = {
  namespace: 'products',
  title: 'Products.org.ai',
  description: 'GS1 Global Product Classification (GPC)',
  icon: <Book className="w-5 h-5" />,
  links: [
    {
      text: 'GS1 GPC',
      url: 'https://www.gs1.org/standards/gpc',
      active: 'none' as const,
    },
    {
      text: 'GitHub',
      url: 'https://github.com/dot-do/platform',
      active: 'none' as const,
    },
  ],
}

export const layoutConfig = createLayoutConfig({ config, buildPageTree })
export const Footer = createFooter({ config })
