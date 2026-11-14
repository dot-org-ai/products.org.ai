/**
 * Create layout configuration for .org.ai sites
 * Based on products.org.ai/app/layout.config.tsx
 */

import type { DocsLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import type { CreateLayoutConfigOptions, OrgAiSiteConfig } from '../types'

/**
 * Create base layout options for Fumadocs DocsLayout
 *
 * @example
 * ```tsx
 * // In your app/layout.config.tsx
 * import { createLayoutConfig } from 'do.org.ai'
 * import { getProductHierarchy } from 'products.org.ai'
 *
 * export const baseOptions = createLayoutConfig({
 *   config: {
 *     namespace: 'products',
 *     title: 'Products.org.ai',
 *     description: 'GS1 GPC Product Classifications',
 *     links: [
 *       { text: 'GS1 GPC', url: 'https://www.gs1.org/standards/gpc' },
 *       { text: 'GitHub', url: 'https://github.com/dot-do/platform' }
 *     ]
 *   },
 *   buildPageTree: () => ({
 *     name: 'Products',
 *     children: getProductHierarchy().segments.map(segment => ({
 *       type: 'folder',
 *       name: segment.name,
 *       index: {
 *         title: segment.name,
 *         url: `/${segment.code}`
 *       },
 *       children: segment.families.map(family => ({
 *         type: 'page',
 *         name: family.name,
 *         url: `/${family.code}`
 *       }))
 *     }))
 *   })
 * })
 * ```
 */
export function createLayoutConfig(options: CreateLayoutConfigOptions): Omit<DocsLayoutProps, 'children' | 'tree'> {
  const { config, icon } = options

  // Convert simplified link format to Fumadocs LinkItemType format
  const links: LinkItemType[] | undefined = config.links?.map((link) => ({
    type: 'main' as const,
    text: link.text,
    url: link.url,
    icon: link.icon,
    active: link.active || 'url',
    external: link.external ?? link.url.startsWith('http'),
  }))

  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          {icon || <DefaultIcon />}
          <span className="font-semibold">{config.title}</span>
        </div>
      ),
      transparentMode: 'top',
    },
    links,
    sidebar: {
      defaultOpenLevel: 0,
      banner: config.adsEnabled !== false ? <SidebarAd namespace={config.namespace} /> : undefined,
      footer: <SidebarFooter config={config} />,
    },
  }
}

/**
 * Default icon component (book icon)
 */
function DefaultIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  )
}

/**
 * Sidebar ad component (placeholder for RSC ads)
 */
function SidebarAd({ namespace }: { namespace: string }) {
  return (
    <div className="p-4 bg-secondary/10 rounded-lg">
      <div className="text-xs text-muted-foreground mb-2">Advertisement</div>
      <div className="text-sm">
        {/* TODO: Integrate with apis.do/ads */}
        <p>Ad space for {namespace}.org.ai</p>
      </div>
    </div>
  )
}

/**
 * Sidebar footer component
 */
function SidebarFooter({ config }: { config: OrgAiSiteConfig }) {
  return (
    <div className="flex flex-col gap-2 p-4 text-xs text-muted-foreground border-t">
      <div>
        <a href={`https://${config.domain || `${config.namespace}.org.ai`}`} className="hover:text-foreground transition-colors">
          {config.title}
        </a>
      </div>
      <div className="flex gap-4">
        <a href="/api" className="hover:text-foreground transition-colors">
          API
        </a>
        <a href="/api-reference" className="hover:text-foreground transition-colors">
          API Reference
        </a>
        <a href="/package" className="hover:text-foreground transition-colors">
          Package
        </a>
        <a href="/llms.txt" className="hover:text-foreground transition-colors">
          LLMs.txt
        </a>
        <a href="https://github.com/dot-do/platform" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          GitHub
        </a>
      </div>
      <div className="text-xs">
        Part of the{' '}
        <a href="https://platform.do" className="hover:text-foreground transition-colors font-medium">
          .do platform
        </a>
      </div>
    </div>
  )
}
