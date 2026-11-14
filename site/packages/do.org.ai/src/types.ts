/**
 * Type definitions for .org.ai sites
 */

import type { ReactNode } from 'react'
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs'

/**
 * Configuration for an .org.ai site
 */
export interface OrgAiSiteConfig {
  /** Namespace (e.g., 'products', 'services') */
  namespace: string

  /** Site title (e.g., 'Products.org.ai') */
  title: string

  /** Site description for metadata */
  description: string

  /** Optional icon component */
  icon?: ReactNode

  /** External links to show in navigation (will be converted to Fumadocs LinkItemType format) */
  links?: Array<{
    text: string
    url: string
    icon?: ReactNode
    active?: 'url' | 'nested-url' | 'none'
    external?: boolean
  }>

  /** Enable search (default: true) */
  searchEnabled?: boolean

  /** Enable ads (default: true) */
  adsEnabled?: boolean

  /** Ad placement configuration */
  adPlacement?: {
    /** Show ads in sidebar */
    sidebar?: boolean
    /** Show ads in content */
    content?: boolean
    /** Show ads in footer */
    footer?: boolean
  }

  /** Content loading strategy */
  loadingStrategy?: 'typescript' | 'api'

  /** Custom domain (if different from namespace.org.ai) */
  domain?: string

  /** Custom color scheme */
  colors?: {
    primary?: string
    secondary?: string
  }
}

/**
 * Hierarchy item for ontology navigation
 */
export interface OntologyItem {
  /** Item code or ID */
  code: string

  /** Display name */
  name: string

  /** URL path */
  url: string

  /** Child items */
  children?: OntologyItem[]

  /** Parent item code */
  parent?: string

  /** Description */
  description?: string

  /** Icon or emoji */
  icon?: string
}

/**
 * Page tree builder function type
 */
export type PageTreeBuilder = () => {
  name: string
  children: Array<{
    type: 'folder' | 'page'
    name: string
    url?: string
    index?: {
      title: string
      url: string
    }
    children?: Array<{
      type: 'page'
      name: string
      url: string
    }>
  }>
}

/**
 * Layout configuration options (input to createLayoutConfig)
 */
export interface CreateLayoutConfigOptions {
  /** Site configuration */
  config: OrgAiSiteConfig

  /** Page tree builder */
  buildPageTree: PageTreeBuilder

  /** Custom icon component */
  icon?: ReactNode
}

/**
 * Layout configuration options (for createDocsLayout)
 */
export interface LayoutConfigOptions {
  /** Site configuration */
  config: OrgAiSiteConfig

  /** Page tree builder */
  buildPageTree: PageTreeBuilder

  /** Custom icon component */
  icon?: ReactNode
}

/**
 * Search result item
 */
export interface SearchResult {
  /** Item ID */
  id: string

  /** Item name/title */
  name: string

  /** Item code (if applicable) */
  code?: string

  /** URL */
  url: string

  /** Description or snippet */
  description?: string

  /** Metadata */
  metadata?: Record<string, any>
}

/**
 * LLM text export options
 */
export interface LLMTextOptions {
  /** Include metadata */
  includeMetadata?: boolean

  /** Format (markdown or plain text) */
  format?: 'markdown' | 'text'

  /** Max length per item */
  maxLength?: number

  /** Include hierarchy information */
  includeHierarchy?: boolean
}
