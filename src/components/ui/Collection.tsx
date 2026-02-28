"use client";

// =============================================================================
// COLLECTION COMPONENT — VARIANT-BASED RENDERING
// =============================================================================
// This component renders the product collection section based on the 
// configuration-driven layout style (e.g., "grid" or "carousel").
// =============================================================================

import type { TenantCollectionContent, TenantLayout, TenantTheme } from "@/types/tenant";
import { useDeviceViewport } from "@/hooks/useDeviceViewport";

// -- Props Type ---------------------------------------------------------------

interface CollectionProps {
  /** Which layout variant to render — driven by tenant config */
  variant: TenantLayout["collectionStyle"];
  /** Content to display — decoupled from layout */
  content: TenantCollectionContent;
  /** Optional theme data if the component needs direct JS access to tokens */
  theme?: TenantTheme;
}

// -- Variant: Grid ------------------------------------------------------------
// A beautifully styled CSS Grid layout for products.
// Standard e-commerce product grid.

function CollectionGridMobile({ content, theme }: { content: TenantCollectionContent; theme?: TenantTheme }) {
  return (
    <section id="collection" className="relative py-20 bg-transparent text-foreground z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mx-auto mb-12 space-y-4">
          <h2 className="text-4xl font-bold">{content.title}</h2>
          <p className="text-lg text-foreground/70">{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {content.items.map((item) => (
            <div key={item.id} className="group relative flex flex-col bg-white/5 rounded-3xl border border-foreground/10 overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-foreground/5">
                <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                <div><h3 className="text-xl font-semibold leading-tight">{item.name}</h3></div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionGridTablet({ content, theme }: { content: TenantCollectionContent; theme?: TenantTheme }) {
  return (
    <section id="collection" className="relative py-24 bg-transparent text-foreground z-10">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-5xl font-bold">{content.title}</h2>
          <p className="text-xl text-foreground/70">{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {content.items.map((item) => (
            <div key={item.id} className="group relative flex flex-col bg-white/5 rounded-3xl border border-foreground/10 overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-foreground/5">
                <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                <div><h3 className="text-xl font-semibold leading-tight">{item.name}</h3></div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionGridDesktop({ content, theme }: { content: TenantCollectionContent; theme?: TenantTheme }) {
  return (
    <section id="collection" className="relative py-24 bg-transparent text-foreground z-10">
      <div className="container mx-auto px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-5xl font-bold">{content.title}</h2>
          <p className="text-lg text-foreground/70">{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {content.items.map((item) => (
            <div key={item.id} className="group relative flex flex-col bg-white/5 rounded-3xl border border-foreground/10 overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-foreground/5">
                <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                <div><h3 className="text-xl font-semibold leading-tight">{item.name}</h3></div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionGrid({ content, theme }: { content: TenantCollectionContent; theme?: TenantTheme }) {
  const device = useDeviceViewport();
  if (device === "mobile") return <CollectionGridMobile content={content} theme={theme} />;
  if (device === "tablet") return <CollectionGridTablet content={content} theme={theme} />;
  return <CollectionGridDesktop content={content} theme={theme} />;
}

// -- Variant: Carousel --------------------------------------------------------
// Horizontal scrollable carousel.
// Placeholder for future implementation.

function CollectionCarousel({ content, theme }: { content: TenantCollectionContent; theme?: TenantTheme }) {
  return (
    <section id="collection" className="relative py-20 bg-transparent text-foreground z-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl opacity-70 mb-8">{content.subtitle}</p>
        <div className="h-64 flex items-center justify-center bg-foreground/5 rounded-3xl border border-dashed border-foreground/20">
          <p className="text-lg text-foreground/50">Carousel Variant Coming Soon...</p>
        </div>
      </div>
    </section>
  );
}

// -- Component Map ------------------------------------------------------------

const COLLECTION_VARIANTS: Record<
  TenantLayout["collectionStyle"],
  React.FC<{ content: TenantCollectionContent; theme?: TenantTheme }>
> = {
  grid: CollectionGrid,
  carousel: CollectionCarousel,
};

// -- Default Fallback ---------------------------------------------------------
const DEFAULT_VARIANT: TenantLayout["collectionStyle"] = "grid";

// -- Main Export --------------------------------------------------------------

/**
 * Collection component — renders a product grid/carousel based on variant prop.
 *
 * @example
 * ```tsx
 * <Collection variant={config.layout.collectionStyle} content={config.collection} theme={config.theme} />
 * ```
 */
export function Collection({ variant, content, theme }: CollectionProps) {
  const VariantComponent = COLLECTION_VARIANTS[variant] ?? COLLECTION_VARIANTS[DEFAULT_VARIANT];

  return <VariantComponent content={content} theme={theme} />;
}
