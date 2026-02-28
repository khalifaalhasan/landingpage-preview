// =============================================================================
// TENANT HOME PAGE
// =============================================================================
// The main landing page for each tenant. Reads the tenant config and renders
// sections based on the configuration-driven layout.
//
// This is a Server Component — all data fetching happens at request time
// on the server with zero client-side overhead.
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getTenantConfig, getAllTenantSlugs } from "@/lib/tenant";
import { Hero } from "@/components/Hero";
import Features from "@/components/ui/Features";
import { Collection } from "@/components/ui/Collection";
import { About } from "@/components/ui/About";
import type { TenantLayout } from "@/types/tenant";

interface TenantPageProps {
  params: Promise<{ tenant: string }>;
}

// -- Dynamic Metadata ---------------------------------------------------------
export async function generateMetadata({ params }: TenantPageProps): Promise<Metadata> {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);

  if (!config) {
    return { title: "Not Found" };
  }

  return {
    title: `${config.name} — ${config.hero.title}`,
    description: config.description,
  };
}

// -- Static Params ------------------------------------------------------------
export function generateStaticParams() {
  return getAllTenantSlugs().map((slug) => ({
    tenant: slug,
  }));
}

// -- Page Component -----------------------------------------------------------
export default async function TenantPage({ params }: TenantPageProps) {
  const { tenant } = await params;
  const config = getTenantConfig(tenant);

  if (!config) {
    notFound();
  }

  // -- Handle Layout Overrides ----------------------------------------------
  const cookieStore = await cookies();
  const overrideCookie = cookieStore.get("layout-override");
  let layoutOverrides: Partial<TenantLayout> = {};
  
  if (overrideCookie) {
    try {
      layoutOverrides = JSON.parse(overrideCookie.value);
    } catch (e) {
      console.error("Failed to parse layout-override cookie in page.tsx", e);
    }
  }

  // Merge base config with any cookie overrides
  const mergedLayout = {
    ...config.layout,
    ...layoutOverrides,
  };

  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/* HERO SECTION (#home)                                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="home">
        <Hero variant={mergedLayout.heroStyle} content={config.hero} />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FEATURES SECTION (#features)                                       */}
      {/* ------------------------------------------------------------------ */}
      {config.features && (
        <Features 
          variant={mergedLayout.featuresStyle} 
          content={config.features} 
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* COLLECTION SECTION (#collection)                                   */}
      {/* ------------------------------------------------------------------ */}
      <Collection 
        variant={mergedLayout.collectionStyle} 
        content={config.collection} 
        theme={config.theme} 
      />

      {/* ------------------------------------------------------------------ */}
      {/* ABOUT SECTION (#about)                                             */}
      {/* ------------------------------------------------------------------ */}
      <About 
        variant={mergedLayout.aboutStyle} 
        content={config.about} 
        theme={config.theme} 
      />
    </main>
  );
}