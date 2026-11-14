/**
 * API documentation page template
 * Shows available API endpoints and usage
 */

import type { Metadata } from 'next'

/**
 * Sanitize string input to prevent XSS
 * Escapes HTML special characters
 */
function sanitizeString(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;')
}

/**
 * Validate and sanitize namespace (alphanumeric and hyphens only)
 */
function validateNamespace(namespace: string): string {
  if (!/^[a-z0-9-]+$/.test(namespace)) {
    throw new Error('Invalid namespace: must contain only lowercase letters, numbers, and hyphens')
  }
  return namespace
}

export interface ApiPageTemplateProps {
  namespace: string
  title: string
  description?: string
  baseUrl?: string
  endpoints?: ApiEndpoint[]
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  example?: string
}

export function generateApiMetadata(props: ApiPageTemplateProps): Metadata {
  return {
    title: `API - ${props.title}`,
    description: props.description || `API documentation for ${props.title}`,
  }
}

export function ApiPageTemplate({ namespace, title, description, baseUrl, endpoints }: ApiPageTemplateProps) {
  // Validate and sanitize inputs
  const validatedNamespace = validateNamespace(namespace)
  const apiBaseUrl = baseUrl || `https://api.${validatedNamespace}.org.ai`
  const sanitizedTitle = sanitizeString(title)
  const sanitizedDescription = description ? sanitizeString(description) : null

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">API Documentation</h1>

      <p className="text-lg text-muted-foreground mb-8">{sanitizedDescription || `Access ${sanitizedTitle} data programmatically via our REST API`}</p>

      <div className="bg-secondary/10 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Base URL</h2>
        <code className="text-sm bg-secondary px-3 py-2 rounded">{apiBaseUrl}</code>
      </div>

      {endpoints && endpoints.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Endpoints</h2>
          {endpoints.map((endpoint) => (
            <div key={`${endpoint.method}-${endpoint.path}`} className="border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded text-sm font-mono font-bold ${
                    endpoint.method === 'GET'
                      ? 'bg-blue-500/10 text-blue-600'
                      : endpoint.method === 'POST'
                        ? 'bg-green-500/10 text-green-600'
                        : endpoint.method === 'PUT'
                          ? 'bg-yellow-500/10 text-yellow-600'
                          : endpoint.method === 'DELETE'
                            ? 'bg-red-500/10 text-red-600'
                            : 'bg-gray-500/10 text-gray-600'
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="font-mono text-sm">{endpoint.path}</code>
              </div>
              <p className="text-muted-foreground mb-3">{endpoint.description}</p>
              {endpoint.example && (
                <div className="bg-secondary/5 rounded p-4">
                  <p className="text-sm font-semibold mb-2">Example:</p>
                  <code className="text-xs block whitespace-pre-wrap">{endpoint.example}</code>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Common Endpoints</h2>

          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded text-sm font-mono font-bold bg-blue-500/10 text-blue-600">GET</span>
              <code className="font-mono text-sm">
                /{'{'}slug{'}'}.json
              </code>
            </div>
            <p className="text-muted-foreground mb-3">Get a single entity by slug</p>
            <div className="bg-secondary/5 rounded p-4">
              <p className="text-sm font-semibold mb-2">Example:</p>
              <code className="text-xs block">curl {apiBaseUrl}/example.json</code>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded text-sm font-mono font-bold bg-blue-500/10 text-blue-600">GET</span>
              <code className="font-mono text-sm">/all</code>
            </div>
            <p className="text-muted-foreground mb-3">Get all entities</p>
            <div className="bg-secondary/5 rounded p-4">
              <p className="text-sm font-semibold mb-2">Example:</p>
              <code className="text-xs block">curl {apiBaseUrl}/all</code>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded text-sm font-mono font-bold bg-blue-500/10 text-blue-600">GET</span>
              <code className="font-mono text-sm">
                /search?q={'{'}query{'}'}
              </code>
            </div>
            <p className="text-muted-foreground mb-3">Search entities</p>
            <div className="bg-secondary/5 rounded p-4">
              <p className="text-sm font-semibold mb-2">Example:</p>
              <code className="text-xs block">curl {apiBaseUrl}/search?q=example</code>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 p-6 border-l-4 border-blue-500 bg-blue-500/5">
        <h3 className="text-lg font-semibold mb-2">Need more details?</h3>
        <p className="text-muted-foreground">
          Check out the{' '}
          <a href="/api-reference" className="text-blue-600 hover:underline">
            full API reference
          </a>{' '}
          for detailed documentation including request/response schemas, authentication, and more.
        </p>
      </div>
    </div>
  )
}
