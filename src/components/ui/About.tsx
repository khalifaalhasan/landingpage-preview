"use client";

// =============================================================================
// ABOUT COMPONENT — VARIANT-BASED RENDERING
// =============================================================================
// This component renders the "About Us" section based on the 
// configuration-driven layout style (e.g., "split" or "story").
// =============================================================================

import type { TenantAboutContent, TenantLayout, TenantTheme } from "@/types/tenant";
import { useDeviceViewport } from "@/hooks/useDeviceViewport";

// -- Props Type ---------------------------------------------------------------

interface AboutProps {
  /** Which layout variant to render — driven by tenant config */
  variant: TenantLayout["aboutStyle"];
  /** Content to display — decoupled from layout */
  content: TenantAboutContent;
  /** Optional theme data if the component needs direct JS access to tokens */
  theme?: TenantTheme;
}

// -- Variant: Split -----------------------------------------------------------
// A clean, modern split layout. Image on left, text and stats on right.
// Uses subtle background styling and nice typography.

function AboutSplitMobile({ content, theme }: { content: TenantAboutContent; theme?: TenantTheme }) {
  return (
    <section id="about" className="relative py-20 bg-transparent text-foreground overflow-hidden z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12">
          
          <div className="relative group mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-3xl opacity-50" />
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-foreground/10 border border-foreground/10">
              <img src={content.imageUrl} alt={content.title} className="w-full h-full object-cover rounded-[2.5rem]" />
            </div>
            <div className="absolute -bottom-6 -right-2 bg-background p-5 rounded-3xl shadow-2xl shadow-primary/10 border border-foreground/5">
              <span className="text-3xl font-black text-primary block leading-none">{content.stats?.[0]?.value || "100%"}</span>
              <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mt-1 block">
                {content.stats?.[0]?.label || "Satisfaction"}
              </span>
            </div>
          </div>

          <div className="space-y-8 text-center mt-4">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {content.title}
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                {content.heading}
              </h2>
            </div>
            
            <div className="space-y-6 text-base text-foreground/70 leading-relaxed text-left">
              {content.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {content.stats && content.stats.length > 1 && (
              <div className="pt-8 mt-8 border-t border-foreground/10 grid grid-cols-2 gap-6 text-left">
                {content.stats.slice(1).map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="block text-3xl font-bold text-foreground">{stat.value}</span>
                    <span className="block text-xs font-medium text-foreground/60 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSplitTablet({ content, theme }: { content: TenantAboutContent; theme?: TenantTheme }) {
  return (
    <section id="about" className="relative py-24 bg-transparent text-foreground overflow-hidden z-10">
      <div className="container mx-auto px-8 max-w-4xl">
        <div className="flex flex-col gap-16">
          
          <div className="relative group mx-auto w-full max-w-md">
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-3xl opacity-50" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-foreground/10 border border-foreground/10">
              <img src={content.imageUrl} alt={content.title} className="w-full h-full object-cover rounded-[2.5rem]" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-background p-6 rounded-3xl shadow-2xl shadow-primary/10 border border-foreground/5">
              <span className="text-4xl font-black text-primary block leading-none">{content.stats?.[0]?.value || "100%"}</span>
              <span className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mt-2 block">
                {content.stats?.[0]?.label || "Satisfaction"}
              </span>
            </div>
          </div>

          <div className="space-y-10 text-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {content.title}
              </span>
              <h2 className="text-5xl font-bold leading-tight tracking-tight">
                {content.heading}
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-foreground/70 leading-relaxed text-left mx-auto">
              {content.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {content.stats && content.stats.length > 1 && (
              <div className="pt-8 mt-8 border-t border-foreground/10 grid grid-cols-3 gap-8 text-left">
                {content.stats.slice(1).map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="block text-4xl font-bold text-foreground">{stat.value}</span>
                    <span className="block text-sm font-medium text-foreground/60 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSplitDesktop({ content, theme }: { content: TenantAboutContent; theme?: TenantTheme }) {
  return (
    <section id="about" className="relative py-24 bg-transparent text-foreground overflow-hidden z-10">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-2 gap-16 items-center">
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-foreground/10 border border-foreground/10">
              <img src={content.imageUrl} alt={content.title} className="w-full h-full object-cover rounded-[2.5rem] group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            <div className="absolute -bottom-6 -right-12 bg-background p-6 rounded-3xl shadow-2xl shadow-primary/10 border border-foreground/5 transform group-hover:-translate-y-2 transition-transform duration-500">
              <span className="text-4xl font-black text-primary block leading-none">{content.stats?.[0]?.value || "100%"}</span>
              <span className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mt-2 block">
                {content.stats?.[0]?.label || "Satisfaction"}
              </span>
            </div>
          </div>

          <div className="space-y-10 pl-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {content.title}
              </span>
              <h2 className="text-6xl font-bold leading-tight tracking-tight">
                {content.heading}
              </h2>
            </div>
            
            <div className="space-y-6 text-xl text-foreground/70 leading-relaxed">
              {content.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {content.stats && content.stats.length > 1 && (
              <div className="pt-8 mt-8 border-t border-foreground/10 grid grid-cols-3 gap-8">
                {content.stats.slice(1).map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="block text-4xl font-bold text-foreground">{stat.value}</span>
                    <span className="block text-sm font-medium text-foreground/60 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSplit({ content, theme }: { content: TenantAboutContent; theme?: TenantTheme }) {
  const device = useDeviceViewport();
  if (device === "mobile") return <AboutSplitMobile content={content} theme={theme} />;
  if (device === "tablet") return <AboutSplitTablet content={content} theme={theme} />;
  return <AboutSplitDesktop content={content} theme={theme} />;
}

// -- Variant: Story -----------------------------------------------------------
// A narrative-focused centered layout.
// Placeholder for future implementation.

function AboutStory({ content, theme }: { content: TenantAboutContent; theme?: TenantTheme }) {
  return (
    <section id="about" className="relative py-24 bg-transparent text-foreground z-10">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-5xl font-bold mb-8">{content.heading}</h2>
        <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12">
           <img src={content.imageUrl} alt={content.title} className="w-full h-full object-cover" />
        </div>
        <div className="text-xl text-foreground/70 space-y-6 text-left">
           <p>Story variant coming soon...</p>
        </div>
      </div>
    </section>
  );
}

// -- Component Map ------------------------------------------------------------

const ABOUT_VARIANTS: Record<
  TenantLayout["aboutStyle"],
  React.FC<{ content: TenantAboutContent; theme?: TenantTheme }>
> = {
  split: AboutSplit,
  story: AboutStory,
};

// -- Default Fallback ---------------------------------------------------------
const DEFAULT_VARIANT: TenantLayout["aboutStyle"] = "split";

// -- Main Export --------------------------------------------------------------

/**
 * About component — renders the About Us section based on variant prop.
 *
 * @example
 * ```tsx
 * <About variant={config.layout.aboutStyle} content={config.about} theme={config.theme} />
 * ```
 */
export function About({ variant, content, theme }: AboutProps) {
  const VariantComponent = ABOUT_VARIANTS[variant] ?? ABOUT_VARIANTS[DEFAULT_VARIANT];

  return <VariantComponent content={content} theme={theme} />;
}
