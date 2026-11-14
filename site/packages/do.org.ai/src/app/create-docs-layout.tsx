/**
 * Create docs layout wrapper for .org.ai sites
 */

import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import type { Root } from 'fumadocs-core/page-tree'
import type { LayoutConfigOptions } from '../types'
import { createLayoutConfig } from './create-layout-config'

/**
 * Create a DocsLayout wrapper component
 *
 * @example
 * ```tsx
 * // In your app/[slug]/layout.tsx
 * import { createDocsLayout } from 'do.org.ai'
 * import { getProductHierarchy } from 'products.org.ai'
 *
 * const DocsLayoutWrapper = createDocsLayout({
 *   config: {
 *     namespace: 'products',
 *     title: 'Products.org.ai',
 *     description: 'GS1 GPC Product Classifications'
 *   },
 *   buildPageTree: () => ({
 *     name: 'Products',
 *     children: getProductHierarchy().segments.map(...)
 *   })
 * })
 *
 * export default function Layout({ children }: { children: ReactNode }) {
 *   return <DocsLayoutWrapper>{children}</DocsLayoutWrapper>
 * }
 * ```
 */
export function createDocsLayout(options: LayoutConfigOptions) {
  const baseOptions = createLayoutConfig(options)
  const pageTree = options.buildPageTree()

  return function DocsLayoutWrapper({ children }: { children: ReactNode }) {
    return (
      <DocsLayout {...baseOptions} tree={pageTree as Root}>
        {children}
      </DocsLayout>
    )
  }
}
