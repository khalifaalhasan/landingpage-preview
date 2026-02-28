// =============================================================================
// TENANT CONFIG LOADER
// =============================================================================
// Loads and validates tenant configuration from static JSON files.
//
// ARCHITECTURE NOTE:
// We use a static import map instead of fs.readFile so this works seamlessly
// in both Node.js server components AND Edge middleware (which has no fs).
// To add a new tenant, add its JSON import to the TENANT_REGISTRY below.
// =============================================================================

import type { TenantConfig } from "@/types/tenant";

// -- Static Import Registry --------------------------------------------------
// Each tenant JSON is imported statically. This enables:
// 1. Type checking at build time
// 2. Tree-shaking of unused configs in production
// 3. Compatibility with Edge Runtime (no filesystem access)
// -----------------------------------------------------------------------------
import sepatuConfig from "@/config/tenants/sepatu.json";

/**
 * Registry of all available tenant configs, keyed by slug.
 * Adding a new tenant = import the JSON + add an entry here.
 */
const TENANT_REGISTRY: Record<string, TenantConfig> = {
  sepatu: sepatuConfig as TenantConfig,
};

/**
 * Retrieve a tenant's configuration by its slug.
 *
 * @param slug - The tenant identifier (matches subdomain and JSON filename)
 * @returns The tenant config if found, or `null` if the slug is unknown
 *
 * @example
 * ```ts
 * const config = getTenantConfig("sepatu");
 * if (!config) notFound();
 * ```
 */
export function getTenantConfig(slug: string): TenantConfig | null {
  return TENANT_REGISTRY[slug] ?? null;
}

/**
 * Get all registered tenant slugs.
 * Useful for `generateStaticParams` to pre-render all tenant pages at build.
 */
export function getAllTenantSlugs(): string[] {
  return Object.keys(TENANT_REGISTRY);
}
