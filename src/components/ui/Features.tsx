"use client";

import type { TenantFeaturesContent, TenantLayout } from "@/types/tenant";
import { CheckCircle2, Hexagon, Layers, Zap } from "lucide-react";
import { useDeviceViewport } from "@/hooks/useDeviceViewport";

// =============================================================================
// FEATURES COMPONENT — VARIANT-BASED RENDERING
// =============================================================================

interface FeaturesProps {
  variant: TenantLayout["featuresStyle"];
  content?: TenantFeaturesContent;
}

// Fallback icons if none provided
const ICONS = [Zap, Layers, Hexagon, CheckCircle2];

// -- Variant: Grid ------------------------------------------------------------
// A sleek 2x2 or responsive grid of glassmorphic feature cards.

function FeaturesGridMobile({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-20 relative z-10 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mx-auto mb-12 space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-foreground">
            {content.title}
          </h2>
          <p className="text-lg text-foreground/60">
            {content.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <div key={index} className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesGridTablet({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-24 relative z-10 bg-transparent">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-5xl font-black tracking-tight text-foreground">
            {content.title}
          </h2>
          <p className="text-xl text-foreground/60">
            {content.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <div key={index} className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesGridDesktop({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-24 relative z-10 bg-transparent">
      <div className="container mx-auto px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-5xl font-black tracking-tight text-foreground">
            {content.title}
          </h2>
          <p className="text-lg text-foreground/60">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <div 
                key={index}
                className="group relative p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col items-start"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid({ content, variant }: FeaturesProps) {
  const device = useDeviceViewport();
  if (device === "mobile") return <FeaturesGridMobile content={content} variant={variant} />;
  if (device === "tablet") return <FeaturesGridTablet content={content} variant={variant} />;
  return <FeaturesGridDesktop content={content} variant={variant} />;
}

// -- Variant: List ------------------------------------------------------------
// A vertical staggered layout emphasizing individual features.

function FeaturesListMobile({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-20 relative z-10 bg-transparent">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tighter text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            {content.title}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <div key={index} className="flex flex-col gap-6 items-start">
                <div className="w-full aspect-video rounded-3xl bg-foreground/5 border border-foreground/10 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
                  <IconComponent className="w-16 h-16 text-primary opacity-20" />
                </div>
                <div className="w-full space-y-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary mb-4">
                    <span className="font-mono text-sm font-bold">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesListDesktop({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-24 relative z-10 bg-transparent">
      <div className="container mx-auto px-12 max-w-5xl">
        <div className="mb-20 space-y-4">
          <h2 className="text-6xl font-black tracking-tighter text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            {content.title}
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            const isEven = index % 2 === 0;

            return (
              <div 
                key={index}
                className={`flex flex-row gap-16 items-center ${isEven ? '' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2 aspect-video rounded-3xl bg-foreground/5 border border-foreground/10 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
                  <IconComponent className="w-24 h-24 text-primary opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" />
                </div>
                
                <div className="w-1/2 space-y-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary mb-6">
                    <span className="font-mono text-sm font-bold">0{index + 1}</span>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-lg text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesList({ content, variant }: FeaturesProps) {
  const device = useDeviceViewport();
  if (device === "mobile" || device === "tablet") return <FeaturesListMobile content={content} variant={variant} />;
  return <FeaturesListDesktop content={content} variant={variant} />;
}

// -- Variant: UMKM ------------------------------------------------------------
// Solid brand color background to alternate with Hero's image background.

function FeaturesUmkmMobile({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-20 relative z-10 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mx-auto mb-12 space-y-4">
          <h2 className="text-4xl font-black tracking-tight">
            {content.title}
          </h2>
          <p className="text-lg opacity-80">
            {content.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <div key={index} className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 mb-6">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="opacity-80 leading-relaxed text-sm text-white">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesUmkmTablet({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-24 relative z-10 bg-primary text-primary-foreground">
      <div className="container mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-5xl font-black tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl opacity-80">
            {content.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <div key={index} className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 mb-6">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="opacity-80 leading-relaxed text-sm text-white">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesUmkmDesktop({ content }: FeaturesProps) {
  if (!content || !content.items) return null;

  return (
    <section id="features" className="py-24 relative z-10 bg-primary text-primary-foreground">
      <div className="container mx-auto px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-5xl font-black tracking-tight">
            {content.title}
          </h2>
          <p className="text-lg opacity-80">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {content.items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <div 
                key={index}
                className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="opacity-80 leading-relaxed text-sm text-white">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesUmkm({ content, variant }: FeaturesProps) {
  const device = useDeviceViewport();
  if (device === "mobile") return <FeaturesUmkmMobile content={content} variant={variant} />;
  if (device === "tablet") return <FeaturesUmkmTablet content={content} variant={variant} />;
  return <FeaturesUmkmDesktop content={content} variant={variant} />;
}

// -- Component Map ------------------------------------------------------------

const FEATURES_VARIANTS: Record<TenantLayout["featuresStyle"], React.FC<FeaturesProps>> = {
  grid: FeaturesGrid,
  list: FeaturesList,
  umkm: FeaturesUmkm,
};

const DEFAULT_VARIANT: TenantLayout["featuresStyle"] = "grid";

// -- Main Export --------------------------------------------------------------

export default function Features(props: FeaturesProps) {
  const VariantComponent = FEATURES_VARIANTS[props.variant] ?? FEATURES_VARIANTS[DEFAULT_VARIANT];
  return <VariantComponent {...props} />;
}
