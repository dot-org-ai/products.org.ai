import { createApiReferencePage, createOpenAPISpec } from 'do.org.ai'
import type { Metadata } from 'next'

const spec = createOpenAPISpec({
  namespace: 'products',
  version: '1.0.0',
  title: 'Products.org.ai API',
  description: 'GS1 Global Product Classification (GPC) REST API - Access 20,000+ product classifications',
})

// Extend the base spec with products-specific endpoints
const productsSpec = {
  ...spec,
  paths: {
    ...(spec.paths as Record<string, unknown>),
    '/segments': {
      get: {
        summary: 'Get all segments',
        description: 'Retrieve all top-level product segments in GS1 GPC',
        tags: ['Products'],
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
                      code: { type: 'string', example: '10000000' },
                      name: { type: 'string', example: 'Food/Beverage/Tobacco' },
                      description: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/segments/{code}/families': {
      get: {
        summary: 'Get families in segment',
        description: 'Retrieve all product families within a specific segment',
        tags: ['Products'],
        parameters: [
          {
            name: 'code',
            in: 'path',
            required: true,
            description: 'Segment code (8 digits)',
            schema: { type: 'string', pattern: '^\\d{8}$', example: '10000000' },
          },
        ],
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
                      code: { type: 'string' },
                      name: { type: 'string' },
                      segmentCode: { type: 'string' },
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

export const metadata: Metadata = {
  title: 'API Reference - Products.org.ai',
  description: 'Interactive API documentation for GS1 GPC REST API',
}

export default function ApiReferencePage() {
  return createApiReferencePage({
    namespace: 'products',
    title: 'Products.org.ai',
    spec: productsSpec,
  })
}
