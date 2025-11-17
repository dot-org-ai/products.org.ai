/**
 * Wikidata SPARQL Client
 * Queries Wikidata for product information
 */

const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql'
const USER_AGENT = 'products.org.ai/1.0 (https://products.org.ai)'

export interface WikidataProduct {
  qid: string
  label: string
  description?: string
  manufacturer?: string
  manufacturerQID?: string
  material?: string
  materialQID?: string
  inception?: string
  image?: string
  wikipedia?: string
  gpcCategory?: string
  unspscCode?: string
}

export class WikidataClient {
  private endpoint: string

  constructor(endpoint: string = WIKIDATA_ENDPOINT) {
    this.endpoint = endpoint
  }

  /**
   * Execute a SPARQL query against Wikidata
   */
  async query(sparql: string): Promise<any> {
    const url = new URL(this.endpoint)
    url.searchParams.set('query', sparql)
    url.searchParams.set('format', 'json')

    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/sparql-results+json'
      }
    })

    if (!response.ok) {
      throw new Error(`Wikidata query failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryQID: string, limit: number = 100): Promise<WikidataProduct[]> {
    const sparql = `
      SELECT ?product ?productLabel ?productDescription
             ?manufacturer ?manufacturerLabel
             ?material ?materialLabel
             ?inception ?image ?wikipedia
      WHERE {
        ?product wdt:P31/wdt:P279* wd:${categoryQID}.

        OPTIONAL { ?product wdt:P176 ?manufacturer. }
        OPTIONAL { ?product wdt:P186 ?material. }
        OPTIONAL { ?product wdt:P571 ?inception. }
        OPTIONAL { ?product wdt:P18 ?image. }

        OPTIONAL {
          ?wikipedia schema:about ?product .
          ?wikipedia schema:inLanguage "en" .
          FILTER (SUBSTR(str(?wikipedia), 1, 25) = "https://en.wikipedia.org/")
        }

        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
          ?product rdfs:label ?productLabel .
          ?product schema:description ?productDescription .
        }
      }
      LIMIT ${limit}
    `

    const results = await this.query(sparql)
    return this.parseProductResults(results)
  }

  /**
   * Get all products (general query)
   */
  async getAllProducts(limit: number = 1000, offset: number = 0): Promise<WikidataProduct[]> {
    const sparql = `
      SELECT ?product ?productLabel ?productDescription
             ?manufacturer ?manufacturerLabel
             ?material ?materialLabel
             ?inception ?image ?wikipedia
      WHERE {
        ?product wdt:P31/wdt:P279* wd:Q2424752.

        OPTIONAL { ?product wdt:P176 ?manufacturer. }
        OPTIONAL { ?product wdt:P186 ?material. }
        OPTIONAL { ?product wdt:P571 ?inception. }
        OPTIONAL { ?product wdt:P18 ?image. }

        OPTIONAL {
          ?wikipedia schema:about ?product .
          ?wikipedia schema:inLanguage "en" .
          FILTER (SUBSTR(str(?wikipedia), 1, 25) = "https://en.wikipedia.org/")
        }

        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
          ?product rdfs:label ?productLabel .
          ?product schema:description ?productDescription .
        }
      }
      LIMIT ${limit}
      OFFSET ${offset}
    `

    const results = await this.query(sparql)
    return this.parseProductResults(results)
  }

  /**
   * Get product details by QID
   */
  async getProductByQID(qid: string): Promise<WikidataProduct | null> {
    const sparql = `
      SELECT ?product ?productLabel ?productDescription
             ?manufacturer ?manufacturerLabel
             ?material ?materialLabel
             ?inception ?image ?wikipedia
      WHERE {
        BIND(wd:${qid} AS ?product)

        OPTIONAL { ?product wdt:P176 ?manufacturer. }
        OPTIONAL { ?product wdt:P186 ?material. }
        OPTIONAL { ?product wdt:P571 ?inception. }
        OPTIONAL { ?product wdt:P18 ?image. }

        OPTIONAL {
          ?wikipedia schema:about ?product .
          ?wikipedia schema:inLanguage "en" .
          FILTER (SUBSTR(str(?wikipedia), 1, 25) = "https://en.wikipedia.org/")
        }

        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
          ?product rdfs:label ?productLabel .
          ?product schema:description ?productDescription .
        }
      }
      LIMIT 1
    `

    const results = await this.query(sparql)
    const products = this.parseProductResults(results)
    return products.length > 0 ? products[0] : null
  }

  /**
   * Search for products by name
   */
  async searchProducts(searchTerm: string, limit: number = 50): Promise<WikidataProduct[]> {
    const sparql = `
      SELECT ?product ?productLabel ?productDescription
             ?manufacturer ?manufacturerLabel
             ?material ?materialLabel
             ?inception ?image ?wikipedia
      WHERE {
        ?product wdt:P31/wdt:P279* wd:Q2424752.
        ?product rdfs:label ?productLabel .

        FILTER(CONTAINS(LCASE(?productLabel), "${searchTerm.toLowerCase()}"))
        FILTER(LANG(?productLabel) = "en")

        OPTIONAL { ?product wdt:P176 ?manufacturer. }
        OPTIONAL { ?product wdt:P186 ?material. }
        OPTIONAL { ?product wdt:P571 ?inception. }
        OPTIONAL { ?product wdt:P18 ?image. }

        OPTIONAL {
          ?wikipedia schema:about ?product .
          ?wikipedia schema:inLanguage "en" .
          FILTER (SUBSTR(str(?wikipedia), 1, 25) = "https://en.wikipedia.org/")
        }

        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
          ?product schema:description ?productDescription .
        }
      }
      LIMIT ${limit}
    `

    const results = await this.query(sparql)
    return this.parseProductResults(results)
  }

  /**
   * Parse SPARQL results into WikidataProduct objects
   */
  private parseProductResults(results: any): WikidataProduct[] {
    if (!results.results || !results.results.bindings) {
      return []
    }

    return results.results.bindings.map((binding: any) => {
      const product: WikidataProduct = {
        qid: this.extractQID(binding.product?.value),
        label: binding.productLabel?.value || '',
        description: binding.productDescription?.value,
        manufacturer: binding.manufacturerLabel?.value,
        manufacturerQID: binding.manufacturer ? this.extractQID(binding.manufacturer.value) : undefined,
        material: binding.materialLabel?.value,
        materialQID: binding.material ? this.extractQID(binding.material.value) : undefined,
        inception: binding.inception?.value,
        image: binding.image?.value,
        wikipedia: binding.wikipedia?.value
      }

      return product
    })
  }

  /**
   * Extract QID from Wikidata entity URI
   */
  private extractQID(uri: string): string {
    const match = uri.match(/Q\d+$/)
    return match ? match[0] : ''
  }
}

// Export singleton instance
export const wikidataClient = new WikidataClient()
