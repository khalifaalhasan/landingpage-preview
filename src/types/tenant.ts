// =============================================================================
// TENANT CONFIG TYPE DEFINITIONS
// =============================================================================
// These types define the strict contract for every tenant JSON configuration.
// Any new tenant must conform to this shape — enforced at the loader level.
// =============================================================================

/**
 * Theme configuration for a tenant.
 * Each color maps to a CSS custom property (e.g., --color-primary)
 * which Tailwind v4 picks up via @theme inline tokens.
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

/**
 * Theme configuration for a tenant.
 * Supports both Light and Dark mode palettes.
 */
export interface TenantTheme {
  light: ThemeColors;
  dark: ThemeColors;
  fontFamily: string;
}

/**
 * Layout variant selectors — these keys drive which component variant
 * gets rendered. Adding a new key here means adding a new component
 * that reads it from configuration.
 */
export interface TenantLayout {
  heroStyle: "split" | "centered" | "minimal" | "umkm";
  navbarStyle: "center" | "left" | "minimal";
  featuresStyle: "grid" | "list" | "umkm";
  collectionStyle: "grid" | "carousel" | "umkm";
  aboutStyle: "split" | "story" | "umkm";
  footerStyle: "standard" | "minimal";
}

/**
 * Content block for the Hero section.
 * Keeps content decoupled from layout — the same content can render
 * in any heroStyle variant.
 */
export interface TenantHeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Feature block for the Features section
 */
export interface FeatureItem {
  title: string;
  description: string;
  icon?: string; // e.g., Lucide icon name or image URL
}

export interface TenantFeaturesContent {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

/**
 * Product Item for the Collection section.
 */
export interface ProductItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

/**
 * Content block for the Collection section.
 */
export interface TenantCollectionContent {
  title: string;
  subtitle: string;
  items: ProductItem[];
}

/**
 * Content block for the About section.
 */
export interface TenantAboutContent {
  title: string;
  heading: string;
  description: string[];
  imageUrl: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

/**
 * Content block for the Footer section.
 */
export interface TenantFooterContent {
  companyName: string;
  contactEmail?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

/**
 * Root tenant configuration.
 * One JSON file per tenant lives in /src/config/tenants/{slug}.json
 */
export interface TenantConfig {
  /** Display name (e.g., "Sepatu Co.") */
  name: string;
  /** URL-safe slug, must match the JSON filename (e.g., "sepatu") */
  slug: string;
  /** SEO meta description */
  description: string;
  /** Visual theme — maps to CSS custom properties */
  theme: TenantTheme;
  /** Layout variant selectors */
  layout: TenantLayout;
  /** Hero section content */
  hero: TenantHeroContent;
  /** Navigation items */
  navigation: NavItem[];
  /** Features section content */
  features?: TenantFeaturesContent;
  /** Collection items */
  collection: TenantCollectionContent;
  /** About section content */
  about: TenantAboutContent;
  /** Footer section content */
  footer?: TenantFooterContent;
}
