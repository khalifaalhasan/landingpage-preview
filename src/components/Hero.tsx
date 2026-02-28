"use client";

// =============================================================================
// HERO COMPONENT — VARIANT-BASED RENDERING
// =============================================================================
// This is the core CDUI pattern: ONE component, MULTIPLE layouts.
//
// PATTERN: Component Map
// Instead of polluting a single render function with conditionals,
// we define each variant as its own sub-component and select it via
// a Record lookup. This is:
//   1. Type-safe — TypeScript ensures only valid variants are accepted
//   2. Extensible — add a new variant = add a new function + map entry
//   3. Clean — each variant is isolated, easy to read and test
//
// USAGE:
// <Hero variant="split" content={config.hero} />
// =============================================================================

import type { TenantHeroContent, TenantLayout } from "@/types/tenant";
import { useDeviceViewport } from "@/hooks/useDeviceViewport";

// -- Props Type ---------------------------------------------------------------

interface HeroProps {
  /** Which layout variant to render — driven by tenant config */
  variant: TenantLayout["heroStyle"];
  /** Content to display — decoupled from layout */
  content: TenantHeroContent;
}

// -- Variant: Split -----------------------------------------------------------
// Two-column layout: text on the left, image on the right.
// Best for product-focused tenants (e.g., e-commerce, SaaS).

// --- Mobile Version ---
function HeroSplitMobile({ content }: { content: TenantHeroContent }) {
  return (
    <section className="relative pt-24 pb-12">
      <div className="container relative z-10 mx-auto px-6 flex flex-col gap-10 items-center text-center">
        {/* -- Text Area -- */}
        <div className="space-y-6 max-w-lg">
          <div className="mx-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-medium text-foreground/80 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            New Collection Live
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1] bg-clip-text">
            {content.title}
          </h1>
          
          <p className="text-lg text-foreground/60 leading-relaxed font-light">
            {content.subtitle}
          </p>
          
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={content.ctaHref}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-foreground text-background font-medium rounded-xl active:scale-95 transition-all duration-200"
            >
              {content.ctaText}
            </a>
            <a
              href="#about"
              className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-transparent text-foreground border border-foreground/20 font-medium rounded-xl hover:bg-foreground/5 transition-all duration-200"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* -- Image Area -- */}
        <div className="relative w-full">
          <img
            src={content.imageUrl}
            alt={content.title}
            className="w-full h-auto aspect-square object-cover rounded-[2rem] shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

// --- Tablet Version ---
function HeroSplitTablet({ content }: { content: TenantHeroContent }) {
  return (
    <section className="relative pt-32 pb-16">
      <div className="container relative z-10 mx-auto px-8 flex flex-col gap-12 items-center text-center">
        {/* -- Text Area -- */}
        <div className="space-y-6 max-w-2xl">
          <div className="mx-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-medium text-foreground/80 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            New Collection Live
          </div>
          
          <h1 className="text-6xl font-bold tracking-tight text-foreground leading-[1.1] bg-clip-text">
            {content.title}
          </h1>
          
          <p className="text-xl text-foreground/60 leading-relaxed font-light mx-auto max-w-xl">
            {content.subtitle}
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <a
              href={content.ctaHref}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-foreground text-background font-medium rounded-full active:scale-95 transition-all duration-200"
            >
              {content.ctaText}
            </a>
          </div>
        </div>

        {/* -- Image Area -- */}
        <div className="relative w-full max-w-3xl">
          <img
            src={content.imageUrl}
            alt={content.title}
            className="w-full h-auto aspect-video object-cover rounded-[2rem] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

// --- Desktop Version ---
function HeroSplitDesktop({ content }: { content: TenantHeroContent }) {
  return (
    <section className="relative pt-40 pb-24">
      <div className="container relative z-10 mx-auto px-12 grid grid-cols-2 gap-12 items-center">
        {/* -- Text Column -- */}
        <div className="space-y-8 max-w-2xl pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-medium text-foreground/80 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            New Collection Live
          </div>
          
          <h1 className="text-7xl font-bold tracking-tight text-foreground leading-[1.1] bg-clip-text">
            {content.title}
          </h1>
          
          <p className="text-2xl text-foreground/60 leading-relaxed font-light">
            {content.subtitle}
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <a
              href={content.ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium rounded-full hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {content.ctaText}
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-foreground border border-foreground/20 font-medium rounded-full hover:bg-foreground/5 transition-all duration-200"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* -- Image Column -- */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl rounded-[2rem]" />
          <div className="relative p-2 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 backdrop-blur-sm">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-auto aspect-[4/3] object-cover rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Adaptive Wrapper ---
function HeroSplit({ content }: { content: TenantHeroContent }) {
  const device = useDeviceViewport();
  
  if (device === "mobile") return <HeroSplitMobile content={content} />;
  if (device === "tablet") return <HeroSplitTablet content={content} />;
  return <HeroSplitDesktop content={content} />;
}

// -- Variant: Centered --------------------------------------------------------
// Full-width centered text with a background image overlay.
// Best for brand-focused tenants (e.g., agencies, portfolios).

function HeroCentered({ content }: { content: TenantHeroContent }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* -- Content -- */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center">
        
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium text-foreground/80 backdrop-blur-md cursor-pointer hover:bg-foreground/10 transition-colors">
          Introducing {content.title} <span className="opacity-50">→</span>
        </div>

        <h1 className="text-6xl @2xl:text-7xl @3xl:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 leading-[1.05] mb-8">
          {content.title}
        </h1>
        
        <p className="text-xl @2xl:text-2xl text-foreground/60 max-w-2xl font-light mb-12 leading-relaxed">
          {content.subtitle}
        </p>
        
        <div className="flex flex-col @2xl:flex-row items-center justify-center gap-4 w-full @2xl:w-auto">
          <a
            href={content.ctaHref}
            className="w-full @2xl:w-auto inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-foreground/10"
          >
            {content.ctaText}
          </a>
        </div>
        
        {/* Dashboard/Product Mockup Preview */}
        <div className="mt-24 w-full max-w-5xl relative group perspective-[2000px]">
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/40 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative p-2 bg-foreground/5 border border-foreground/10 rounded-[2.5rem] backdrop-blur-xl transform will-change-transform rotate-x-12 group-hover:rotate-x-0 transition-transform duration-1000 ease-out">
             <img
               src={content.imageUrl}
               alt={content.title}
               className="w-full aspect-[16/9] object-cover rounded-[2rem] shadow-2xl"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-[2rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}

// -- Variant: Minimal ---------------------------------------------------------
// Clean, text-only hero with subtle accent underline.
// Best for professional/corporate tenants.

function HeroMinimal({ content }: { content: TenantHeroContent }) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <div className="space-y-10">
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />

          <h1 className="text-5xl @3xl:text-6xl @5xl:text-7xl font-bold tracking-tight text-foreground leading-tight">
            {content.title}
          </h1>
          
          <p className="text-xl @3xl:text-2xl text-foreground/50 leading-relaxed font-light max-w-2xl">
            {content.subtitle}
          </p>
          
          <div className="pt-4">
            <a
              href={content.ctaHref}
              className="group inline-flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {content.ctaText}
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5 border border-foreground/10 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// -- Component Map ------------------------------------------------------------
// This is the heart of the variant pattern. The map is typed so TypeScript
// will error if a variant key doesn't match TenantLayout["heroStyle"].

const HERO_VARIANTS: Record<
  TenantLayout["heroStyle"],
  React.FC<{ content: TenantHeroContent }>
> = {
  split: HeroSplit,
  centered: HeroCentered,
  minimal: HeroMinimal,
};

// -- Default Fallback ---------------------------------------------------------
const DEFAULT_VARIANT: TenantLayout["heroStyle"] = "centered";

// -- Main Export --------------------------------------------------------------

/**
 * Hero component — renders a different layout based on the `variant` prop.
 *
 * @example
 * ```tsx
 * <Hero variant={config.layout.heroStyle} content={config.hero} />
 * ```
 */
export function Hero({ variant, content }: HeroProps) {
  // Look up the variant component, fall back to default if unknown
  const VariantComponent = HERO_VARIANTS[variant] ?? HERO_VARIANTS[DEFAULT_VARIANT];

  return <VariantComponent content={content} />;
}
