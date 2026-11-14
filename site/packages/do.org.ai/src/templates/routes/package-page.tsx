/**
 * Package documentation page template using Fumadocs TypeScript
 * Renders TypeScript API documentation from package
 */

import type { ReactElement } from 'react'

/**
 * Validate package name format
 */
function validatePackageName(packageName: string): string {
  if (!/^[@a-z0-9-]+([/.][a-z0-9-]+)*$/.test(packageName)) {
    throw new Error('Invalid package name format')
  }
  return packageName
}

/**
 * Validate namespace format
 */
function validateNamespace(namespace: string): string {
  if (!/^[a-z0-9-]+$/.test(namespace)) {
    throw new Error('Invalid namespace: must contain only lowercase letters, numbers, and hyphens')
  }
  return namespace
}

export interface PackagePageTemplateProps {
  namespace: string
  title: string
  packageName: string
  description?: string
  npmUrl?: string
  githubUrl?: string
}

/**
 * Generate package documentation page
 *
 * Usage in app/package/page.tsx:
 * ```tsx
 * import { createPackagePage } from 'do.org.ai/templates/routes/package-page'
 *
 * export default createPackagePage({
 *   namespace: 'products',
 *   title: 'Products.org.ai',
 *   packageName: 'products.org.ai',
 *   description: 'GS1 GPC Product Classification TypeScript SDK'
 * })
 * ```
 */
export function createPackagePage(props: PackagePageTemplateProps): ReactElement {
  // Validate inputs
  const validatedNamespace = validateNamespace(props.namespace)
  const validatedPackageName = validatePackageName(props.packageName)

  const npmUrl = props.npmUrl || `https://www.npmjs.com/package/${validatedPackageName}`
  const githubUrl = props.githubUrl || 'https://github.com/dot-do/platform'

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Package Documentation</h1>

      <p className="text-lg text-muted-foreground mb-8">{props.description || `TypeScript SDK for ${props.title}`}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-secondary/10 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Package Name</h3>
          <code className="text-lg bg-secondary px-3 py-2 rounded block">{validatedPackageName}</code>
        </div>

        <div className="bg-secondary/10 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Namespace</h3>
          <code className="text-lg bg-secondary px-3 py-2 rounded block">{validatedNamespace}.org.ai</code>
        </div>
      </div>

      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Installation</h2>
        <div className="bg-secondary/5 rounded p-4 mb-4">
          <code className="text-sm">npm install {validatedPackageName}</code>
        </div>
        <div className="bg-secondary/5 rounded p-4">
          <code className="text-sm">pnpm add {validatedPackageName}</code>
        </div>
      </div>

      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <div className="bg-secondary/5 rounded p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { get, search, getAll } from '${validatedPackageName}'

// Get a single entity
const entity = await get('example-slug')

// Search entities
const results = await search('query')

// Get all entities
const all = await getAll()`}</code>
          </pre>
        </div>
      </div>

      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">API Reference</h2>
        <p className="text-muted-foreground mb-4">Explore the complete TypeScript API documentation below, including all types, interfaces, and functions.</p>

        <div className="bg-secondary/10 rounded p-4">
          <p className="text-sm text-muted-foreground">Fumadocs TypeScript integration will render detailed API documentation here, including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
            <li>Type definitions and interfaces</li>
            <li>Function signatures and parameters</li>
            <li>Return types and generics</li>
            <li>JSDoc comments and examples</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={npmUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View package on npm (opens in new tab)"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          View on npm
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code on GitHub (opens in new tab)"
          className="px-4 py-2 border border-current rounded hover:bg-secondary/10 transition-colors"
        >
          View on GitHub
        </a>
      </div>

      <div className="mt-12 p-6 border-l-4 border-blue-500 bg-blue-500/5">
        <h3 className="text-lg font-semibold mb-2">Implementation Note</h3>
        <p className="text-muted-foreground text-sm">
          To use Fumadocs TypeScript integration, install <code className="bg-secondary px-2 py-1 rounded">fumadocs-typescript</code> and configure it to
          generate API documentation from your package's TypeScript source files.
        </p>
      </div>
    </div>
  )
}
