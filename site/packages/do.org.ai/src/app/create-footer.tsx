/**
 * Create footer component with ontology hierarchy navigation
 * Wikipedia-style navigation structure
 */

import type { ReactNode } from 'react'
import type { OrgAiSiteConfig, OntologyItem } from '../types'

/**
 * Validate and sanitize URL
 * Only allows http/https protocols
 */
function validateUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null
    }
    return parsed.href
  } catch {
    return null
  }
}

interface CreateFooterOptions {
  config: OrgAiSiteConfig
  /** Ontology items to display in hierarchy */
  ontologies?: OntologyItem[]
  /** Custom footer content */
  customContent?: ReactNode
}

/**
 * Create a footer component with ontology hierarchy
 *
 * @example
 * ```tsx
 * // In your app/layout.tsx or docs layout
 * import { createFooter } from 'do.org.ai'
 *
 * const Footer = createFooter({
 *   config: {
 *     namespace: 'products',
 *     title: 'Products.org.ai',
 *     description: '...'
 *   },
 *   ontologies: [
 *     {
 *       code: 'products',
 *       name: 'Products',
 *       url: 'https://products.org.ai',
 *       children: [...]
 *     },
 *     // ... more ontologies
 *   ]
 * })
 * ```
 */
export function createFooter(options: CreateFooterOptions) {
  const { config, ontologies, customContent } = options

  return function Footer() {
    return (
      <footer className="border-t bg-card">
        <div className="container py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Site Info */}
            <div>
              <h3 className="font-semibold mb-4">{config.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{config.description}</p>
              <div className="flex gap-4 text-sm">
                <a href="/api" className="hover:text-foreground transition-colors">
                  API
                </a>
                <a href="/llms.txt" className="hover:text-foreground transition-colors">
                  LLMs.txt
                </a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://github.com/dot-do/platform" className="text-muted-foreground hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://platform.do/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/sitemap.xml" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://platform.do" className="text-muted-foreground hover:text-foreground transition-colors">
                    Platform.do
                  </a>
                </li>
                <li>
                  <a href="https://sdk.do" className="text-muted-foreground hover:text-foreground transition-colors">
                    SDK
                  </a>
                </li>
                <li>
                  <a href="https://cli.do" className="text-muted-foreground hover:text-foreground transition-colors">
                    CLI
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://twitter.com/dotdo" className="text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/dotdo" className="text-muted-foreground hover:text-foreground transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Ontology Hierarchy (Wikipedia-style) */}
          {ontologies && ontologies.length > 0 && (
            <div className="border-t pt-8">
              <div className="bg-secondary/10 rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-sm">Related Ontologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {ontologies.map((ontology) => {
                    const validatedUrl = validateUrl(ontology.url)
                    if (!validatedUrl) return null

                    return (
                      <div key={ontology.code}>
                        <a href={validatedUrl} className="text-sm font-medium hover:text-foreground transition-colors">
                          {ontology.icon && <span className="mr-1">{ontology.icon}</span>}
                          {ontology.name}
                        </a>
                        {ontology.children && ontology.children.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {ontology.children.slice(0, 5).map((child) => {
                              const validatedChildUrl = validateUrl(child.url)
                              if (!validatedChildUrl) return null

                              return (
                                <li key={child.code}>
                                  <a href={validatedChildUrl} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    {child.name}
                                  </a>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Custom Content */}
          {customContent && <div className="border-t pt-8">{customContent}</div>}

          {/* Copyright */}
          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {config.title}. Part of the{' '}
              <a href="https://platform.do" className="hover:text-foreground transition-colors font-medium">
                .do platform
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
