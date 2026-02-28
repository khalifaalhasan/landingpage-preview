// =============================================================================
// TENANT LAYOUT — DYNAMIC THEME INJECTION
// =============================================================================
// This layout wraps every page under /[tenant]/*.
// It loads the tenant config, generates CSS custom properties from the theme,
// and injects them into a wrapper <div> so all child components can use
// Tailwind utilities like bg-primary, text-accent, etc.
//
// ARCHITECTURE:
// This is a Server Component — the config loading and theme generation
// happen on the server. No client-side JS is shipped for theming.
//
// FLOW:
// URL: /sepatu → params.tenant = "sepatu"
//   → getTenantConfig("sepatu") → config
//   → generateThemeStyles(config.theme) → CSS vars
//   → <div style={cssVars}>{children}</div>
// =============================================================================

import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getTenantConfig } from "@/lib/tenant";
import { generateThemeStyles } from "@/lib/theme";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LayoutCustomizer from "@/components/ui/LayoutCustomizer";
import type { TenantLayout as TenantLayoutType } from "@/types/tenant";

interface TenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
  const { tenant } = await params;

  // -- Load tenant config ---------------------------------------------------
  const config = getTenantConfig(tenant);

  // If no config exists for this slug, render Next.js 404
  if (!config) {
    notFound();
  }

  // -- Handle Layout Overrides ----------------------------------------------
  const cookieStore = await cookies();
  const overrideCookie = cookieStore.get("layout-override");
  let layoutOverrides: Partial<TenantLayoutType> = {};
  
  if (overrideCookie) {
    try {
      layoutOverrides = JSON.parse(overrideCookie.value);
    } catch (e) {
      console.error("Failed to parse layout-override cookie in layout.tsx", e);
    }
  }

  // Merge the base config layout with any user overrides
  const mergedLayout = {
    ...config.layout,
    ...layoutOverrides,
  };

  // -- Generate theme CSS block ---------------------------------------------
  const themeCss = generateThemeStyles(config.theme, config.slug);

  return (
    <div
      // Remove min-h-screen and background colors from here since they should be on body
      className="flex flex-col relative overflow-hidden w-full"
      data-tenant={config.slug}
    >
      {/* Inject variables for this tenant's light & dark modes */}
      <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      {/* --- GLOBAL BACKGROUND (Linear Style) --- */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-[100%] blur-[150px] pointer-events-none opacity-50" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* --- APPLICATION CONTENT WRAPPER (For Device Preview Scaling) --- */}
      <div id="tenant-app-wrapper" className="@container transition-all duration-700 ease-in-out mx-auto relative w-full min-h-screen flex flex-col bg-background">
        
        {/* Render Navbar di atas, passing variant dan navigasi dari konfigurasi */}
        <Navbar 
          variant={mergedLayout.navbarStyle}
          tenantName={config.name || "Brand Name"} 
          navigation={config.navigation} 
        />
        
        {/* Konten utama (Hero, dll) akan mengisi sisa ruang */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Render Footer di bawah */}
        <Footer 
          variant={mergedLayout.footerStyle}
          navigation={config.navigation}
          content={config.footer}
        />

      </div>

      {/* Inject Floating Layout Customizer */}
      <LayoutCustomizer activeLayout={mergedLayout} />
    </div>
  );
}
