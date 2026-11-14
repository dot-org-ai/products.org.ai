/**
 * API Reference page template using Fumadocs OpenAPI
 * Renders interactive API documentation from OpenAPI spec
 */

import type { ReactElement } from 'react'

/**
 * Validate namespace format
 */
function validateNamespace(namespace: string): string {
  if (!/^[a-z0-9-]+$/.test(namespace)) {
    throw new Error('Invalid namespace: must contain only lowercase letters, numbers, and hyphens')
  }
  return namespace
}

/**
 * OpenAPI 3.0 Specification type
 * Based on https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md
 */
export interface OpenAPISpec {
  openapi: string
  info: {
    title: string
    version: string
    description?: string
  }
  servers?: Array<{
    url: string
    description?: string
  }>
  paths: Record<string, Record<string, unknown>>
  components?: Record<string, unknown>
}

export interface ApiReferenceTemplateProps {
  namespace: string
  title: string
  spec: OpenAPISpec
}

/**
 * Generate API reference page from OpenAPI spec
 *
 * Usage in app/api-reference/[[...slug]]/page.tsx:
 * ```tsx
 * import { createApiReferencePage } from 'do.org.ai/templates/routes/api-reference'
 * import spec from './spec.json'
 *
 * export default createApiReferencePage({
 *   namespace: 'products',
 *   title: 'Products.org.ai',
 *   spec
 * })
 * ```
 */
export function createApiReferencePage(props: ApiReferenceTemplateProps): ReactElement {
  // Validate inputs
  const validatedNamespace = validateNamespace(props.namespace)

  // For now, return a placeholder
  // Fumadocs OpenAPI integration will be added in the specific route files
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">API Reference</h1>
      <p className="text-lg text-muted-foreground mb-8">Interactive API documentation for {props.title}</p>

      <div className="bg-secondary/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">OpenAPI Specification</h2>
        <p className="text-muted-foreground mb-4">This page displays interactive API documentation generated from the OpenAPI specification.</p>
        <div className="text-sm text-muted-foreground">
          Namespace: <code className="bg-secondary px-2 py-1 rounded">{validatedNamespace}</code>
        </div>
      </div>

      <div className="mt-8 p-6 border-l-4 border-blue-500 bg-blue-500/5">
        <h3 className="text-lg font-semibold mb-2">Implementation Note</h3>
        <p className="text-muted-foreground text-sm">
          To use Fumadocs OpenAPI integration, install <code className="bg-secondary px-2 py-1 rounded">fumadocs-openapi</code> and import the OpenAPI renderer
          component in your route file.
        </p>
      </div>
    </div>
  )
}

/**
 * Helper to create OpenAPI spec template
 *
 * @example
 * ```tsx
 * export const spec = createOpenAPISpec({
 *   namespace: 'products',
 *   version: '1.0.0',
 *   title: 'Products API',
 *   description: 'GS1 GPC Product Classification API'
 * })
 * ```
 */
export function createOpenAPISpec(config: { namespace: string; version: string; title: string; description: string; baseUrl?: string }): OpenAPISpec {
  const baseUrl = config.baseUrl || `https://api.${config.namespace}.org.ai`

  return {
    openapi: '3.0.0',
    info: {
      title: config.title,
      version: config.version,
      description: config.description,
    },
    servers: [
      {
        url: baseUrl,
        description: 'Production API',
      },
    ],
    paths: {
      '/{slug}.json': {
        get: {
          summary: 'Get entity by slug',
          description: 'Retrieve a single entity by its slug identifier',
          parameters: [
            {
              name: 'slug',
              in: 'path',
              required: true,
              description: 'Entity slug identifier',
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      slug: { type: 'string' },
                      name: { type: 'string' },
                      description: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/all': {
        get: {
          summary: 'Get all entities',
          description: 'Retrieve all entities in the collection',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        slug: { type: 'string' },
                        name: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/search': {
        get: {
          summary: 'Search entities',
          description: 'Search for entities matching a query',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              description: 'Search query',
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      query: { type: 'string' },
                      count: { type: 'number' },
                      results: {
                        type: 'array',
                        items: {
                          type: 'object',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }
}
