/**
 * do.org.ai - Shared Next.js base package for .org.ai ontology sites
 *
 * Provides consistent layouts, utilities, and templates for deploying
 * 20-30 domain-specific ontology sites with minimal configuration.
 */

// Core types
export * from './types'

// Layout components
export { createRootLayout } from './app/create-root-layout'
export { createDocsLayout } from './app/create-docs-layout'
export { createLayoutConfig } from './app/create-layout-config'
export { createFooter } from './app/create-footer'

// Middleware
export { createMiddleware } from './app/middleware'

// Utilities
export { createSearchHandler } from './lib/search'
export { getLLMText, createLLMTextExport } from './lib/get-llm-text'
export { generateSitemap } from './lib/sitemap'
export { AdsClient } from './lib/ads-client'
export { createLLMHandler } from './lib/llm-handler'
export { createPageTree } from './lib/source'

// Templates
export { createNextConfig } from './templates/next-config'
export { createVercelConfig } from './templates/vercel-config'

// Route templates
export { ApiPageTemplate, generateApiMetadata, type ApiPageTemplateProps, type ApiEndpoint } from './templates/routes/api-page'
export { createApiReferencePage, createOpenAPISpec, type ApiReferenceTemplateProps } from './templates/routes/api-reference'
export { createPackagePage, type PackagePageTemplateProps } from './templates/routes/package-page'

// Re-export commonly used types from fumadocs
export type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs'
