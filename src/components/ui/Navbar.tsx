"use client";

// =============================================================================
// NAVBAR COMPONENT — VARIANT-BASED RENDERING
// =============================================================================
// Renders the top navigation based on the configuration-driven layout style.
// =============================================================================

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem, TenantLayout, TenantTheme } from "@/types/tenant";
import { ThemeToggle } from "./ThemeToggle";
import { useDeviceViewport } from "@/hooks/useDeviceViewport";

// -- Props Type ---------------------------------------------------------------

interface NavbarProps {
  tenantName: string;
  navigation: NavItem[];
  variant: TenantLayout["navbarStyle"];
  theme?: TenantTheme;
}

// -- Shared Navigation Links Component --
function NavLinks({ navigation, className = "" }: { navigation: NavItem[], className?: string }) {
  return (
    <nav className={`flex gap-8 text-foreground/80 font-medium ${className}`}>
      {navigation.map((item, index) => (
        <Link 
          key={index} 
          href={item.href} 
          className="hover:text-primary hover:-translate-y-0.5 transition-all duration-300"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

// -- Variant: Center (Desktop) ------------------------------------------------
// Logo on the left, links in the center, CTA on the right.

function NavbarCenter({ tenantName, navigation }: NavbarProps) {
  return (
    <header className="sticky top-0 w-full z-50 pt-4 px-6 transition-all duration-300">
      <div className="mx-auto max-w-7xl bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 shadow-lg shadow-black/10 rounded-full py-4 px-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight text-foreground flex-1">
            <Link href="/" className="hover:opacity-80 transition-opacity">{tenantName}</Link>
          </div>
          <div className="flex flex-1 justify-center">
            <NavLinks navigation={navigation} />
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
             <ThemeToggle />
             <button className="px-6 py-2.5 text-sm font-semibold text-primary bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
               Get Started
             </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// -- Variant: Left (Desktop) --------------------------------------------------
// Logo on the left, links right next to it, CTA on the far right.

function NavbarLeft({ tenantName, navigation }: NavbarProps) {
  return (
    <header className="sticky top-0 w-full z-50 bg-background/40 backdrop-blur-2xl border-b border-foreground/5 transition-all duration-300">
      <div className="container mx-auto px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="text-2xl font-black tracking-tight text-foreground">
              <Link href="/" className="hover:opacity-80 transition-opacity">{tenantName}</Link>
            </div>
            <div className="block">
              <NavLinks navigation={navigation} />
            </div>
          </div>
          <div className="flex items-center gap-4">
             <ThemeToggle />
             <button className="px-6 py-2.5 text-sm font-bold text-background bg-foreground rounded-full hover:opacity-90 transition-all duration-300">
               Contact Us
             </button>
          </div>
        </div>
    </header>
  );
}

// -- Variant: Minimal (Desktop) -----------------------------------------------
// Super clean, just logo and links evenly spaced.

function NavbarMinimal({ tenantName, navigation }: NavbarProps) {
  return (
    <header className="sticky top-0 w-full z-50 bg-background/50 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="py-6">
        <div className="container mx-auto px-12 flex items-center justify-between gap-6">
          <div className="text-3xl font-bold tracking-tight text-foreground">
            <Link href="/" className="hover:opacity-80 transition-opacity">{tenantName}</Link>
          </div>
          <div className="flex items-center gap-10">
            <NavLinks navigation={navigation} className="gap-10" />
            <div className="w-px h-6 bg-foreground/10" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

// -- Shared Mobile/Tablet Navbar ----------------------------------------------
// Hamburger menu architecture

function NavbarMobile({ tenantName, navigation, variant }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileOpen]);

  // Adjust style slightly based on variant
  const isPill = variant === "center";
  const headerClass = isPill 
    ? "pt-4 px-4 sticky top-0 w-full z-50 transition-all"
    : "sticky top-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-foreground/5 transition-all";

  const innerClass = isPill
    ? "bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 shadow-lg shadow-black/10 rounded-full py-4 px-6 flex items-center justify-between"
    : "py-4 px-6 flex items-center justify-between";

  return (
    <>
      <header className={headerClass}>
        <div className={innerClass}>
          <div className="text-xl font-black tracking-tight text-foreground">
            <Link href="/" className="hover:opacity-80 transition-opacity">{tenantName}</Link>
          </div>
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -mr-2 text-foreground hover:bg-foreground/5 rounded-full transition-colors z-[60]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay (Slides from Left) */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
        <div 
          className={`absolute top-0 left-0 bottom-0 w-[280px] bg-background border-r border-foreground/10 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="p-6 flex items-center justify-between border-b border-foreground/5">
            <span className="font-bold text-xl">{tenantName}</span>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-foreground/5">
              <X className="w-5 h-5 text-foreground/60" />
            </button>
          </div>
          
          <nav className="flex flex-col p-6 gap-6 overflow-y-auto">
            {navigation.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors hover:translate-x-1 duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto p-6 border-t border-foreground/5 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/60">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

// -- Component Map ------------------------------------------------------------

const NAVBAR_VARIANTS: Record<TenantLayout["navbarStyle"], React.FC<NavbarProps>> = {
  center: NavbarCenter,
  left: NavbarLeft,
  minimal: NavbarMinimal,
};

const DEFAULT_VARIANT: TenantLayout["navbarStyle"] = "center";

// -- Main Export (Adaptive Entry) ---------------------------------------------

export default function Navbar(props: NavbarProps) {
  const device = useDeviceViewport();
  
  if (device === "mobile" || device === "tablet") {
    return <NavbarMobile {...props} />;
  }

  // Desktop
  const VariantComponent = NAVBAR_VARIANTS[props.variant] ?? NAVBAR_VARIANTS[DEFAULT_VARIANT];
  return <VariantComponent {...props} />;
}