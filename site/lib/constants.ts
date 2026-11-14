/**
 * Application-wide constants
 */

/**
 * Estimated number of bricks (product types) per family in the GS1 GPC hierarchy
 * Based on analysis of GPC data showing 100-200 bricks per family on average
 */
export const ESTIMATED_BRICKS_PER_FAMILY = 120

/**
 * Application routes
 */
export const ROUTES = {
  HOME: '/',
  API: '/api',
  PACKAGE: '/package',
} as const
