import type { ApiEndpoint } from 'do.org.ai'

export const productsApiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/{code}.json',
    description: 'Get a product segment, family, class, or brick by GPC code',
    example: `curl https://api.products.org.ai/10000000.json

Response:
{
  "$type": "Segment",
  "$id": "https://products.org.ai/10000000",
  "code": "10000000",
  "name": "Food/Beverage/Tobacco",
  "description": "Products that are consumed by humans or animals..."
}`,
  },
  {
    method: 'GET',
    path: '/all',
    description: 'Get all products (segments, families, classes, and bricks)',
    example: `curl https://api.products.org.ai/all

Response:
[
  {
    "code": "10000000",
    "name": "Food/Beverage/Tobacco",
    ...
  },
  ...
]`,
  },
  {
    method: 'GET',
    path: '/search?q={query}',
    description: 'Search products by name, description, or code',
    example: `curl 'https://api.products.org.ai/search?q=food'

Response:
{
  "query": "food",
  "count": 42,
  "results": [
    {
      "code": "10000000",
      "name": "Food/Beverage/Tobacco",
      ...
    }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/segments',
    description: 'Get all product segments (top-level categories)',
    example: `curl https://api.products.org.ai/segments`,
  },
  {
    method: 'GET',
    path: '/segments/{code}/families',
    description: 'Get all families within a segment',
    example: `curl https://api.products.org.ai/segments/10000000/families`,
  },
]
