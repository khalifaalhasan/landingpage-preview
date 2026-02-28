// =============================================================================
// DYNAMIC THEME UTILITY
// =============================================================================
// Converts a tenant's TenantTheme object into CSS custom properties.
//
// HOW IT WORKS:
// The tenant layout injects these as inline `style` on a wrapper <div>.
// Tailwind v4 @theme tokens reference these CSS variables, so utilities
// like `bg-primary`, `text-accent` etc. automatically adapt per tenant.
//
// DATA FLOW:
// sepatu.json → getTenantConfig() → generateThemeStyles() → style={{...}}
//                                                              ↓
//                                         Tailwind reads --color-primary
// =============================================================================

import type { TenantTheme } from "@/types/tenant";
import type { CSSProperties } from "react";

/**
 * Generates raw CSS text for the given tenant theme.
 * This injects CSS custom properties for both light and dark modes
 * scoped specifically to the tenant's data attribute.
 *
 * @param theme - The tenant's theme configuration
 * @param tenantSlug - The tenant slug to scope the styles to
 * @returns A raw CSS string
 */
export function generateThemeStyles(theme: TenantTheme, tenantSlug: string): string {
  return `
    /* Base/Light Theme (Default) */
    :root {
      --color-primary: ${theme.light.primary};
      --color-secondary: ${theme.light.secondary};
      --color-accent: ${theme.light.accent};
      --color-background: ${theme.light.background};
      --color-foreground: ${theme.light.foreground};
      --font-tenant: ${theme.fontFamily};
    }

    /* Dark Theme */
    .dark {
      --color-primary: ${theme.dark.primary};
      --color-secondary: ${theme.dark.secondary};
      --color-accent: ${theme.dark.accent};
      --color-background: ${theme.dark.background};
      --color-foreground: ${theme.dark.foreground};
      --font-tenant: ${theme.fontFamily};
    }
  `;
}
