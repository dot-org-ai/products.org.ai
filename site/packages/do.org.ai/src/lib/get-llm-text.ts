/**
 * LLM text export utilities
 */

import type { LLMTextOptions } from '../types'

/**
 * Format an item as LLM-friendly text
 *
 * @example
 * ```ts
 * const text = getLLMText(product, {
 *   format: 'markdown',
 *   includeMetadata: true
 * })
 * ```
 */
export function getLLMText(
  item: {
    name: string
    code?: string
    description?: string
    [key: string]: any
  },
  options?: LLMTextOptions
): string {
  const { format = 'markdown', includeMetadata = true, includeHierarchy = false } = options || {}

  if (format === 'markdown') {
    let text = `# ${item.name}\n\n`

    if (item.code) {
      text += `**Code**: ${item.code}\n\n`
    }

    if (item.description) {
      text += `${item.description}\n\n`
    }

    if (includeMetadata && item.metadata) {
      text += `## Metadata\n\n`
      for (const [key, value] of Object.entries(item.metadata)) {
        text += `- **${key}**: ${value}\n`
      }
      text += '\n'
    }

    if (includeHierarchy && item.hierarchy) {
      text += `## Hierarchy\n\n${item.hierarchy}\n\n`
    }

    return text
  }

  // Plain text format
  let text = `${item.name}\n`

  if (item.code) {
    text += `Code: ${item.code}\n`
  }

  if (item.description) {
    text += `\n${item.description}\n`
  }

  return text
}

/**
 * Create a full LLM text export for all items
 */
export function createLLMTextExport(
  items: any[],
  options?: LLMTextOptions & {
    header?: string
    separator?: string
  }
): string {
  const { header, separator = '\n---\n\n', ...llmOptions } = options || {}

  let text = ''

  if (header) {
    text += `${header}\n\n`
  }

  text += items.map((item) => getLLMText(item, llmOptions)).join(separator)

  return text
}
