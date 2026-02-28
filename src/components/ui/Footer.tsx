"use client";

// =============================================================================
// FOOTER COMPONENT — VARIANT-BASED RENDERING
// =============================================================================
// Renders the page footer based on the configuration-driven layout style.
// =============================================================================

import Link from "next/link";
import type { NavItem, TenantFooterContent, TenantLayout, TenantTheme } from "@/types/tenant";
import { useDeviceViewport } from "@/hooks/useDeviceViewport";

// -- Props Type ---------------------------------------------------------------

interface FooterProps {
  variant: TenantLayout["footerStyle"];
  navigation: NavItem[];
  content?: TenantFooterContent;
  theme?: TenantTheme;
}

// -- Variant: Standard --------------------------------------------------------
// A modern, multi-column footer with branding, links, and social.

function FooterStandardMobile({ navigation, content }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const companyName = content?.companyName || "Our Company";

  return (
    <footer className="bg-foreground/5 text-foreground py-12 border-t border-foreground/10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-10 mb-10 text-center">
          
          <div className="space-y-4 text-foreground/80">
            <h3 className="text-2xl font-black tracking-tight text-foreground">{companyName}</h3>
            <p className="max-w-sm mx-auto">Crafting exceptional experiences and building the future of our industry, one step at a time.</p>
            {content?.contactEmail && (
              <p className="pt-2"><a href={`mailto:${content.contactEmail}`} className="hover:text-primary transition-colors">{content.contactEmail}</a></p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">Quick Links</h4>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <li key={index}><Link href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {content?.socialLinks && content.socialLinks.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">Follow Us</h4>
              <ul className="flex justify-center gap-6">
                {content.socialLinks.map((social, index) => (
                  <li key={index}><a href={social.url} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition-colors">{social.platform}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-col items-center gap-4 text-sm text-foreground/50 text-center">
          <p>© {currentYear} {companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterStandardTablet({ navigation, content }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const companyName = content?.companyName || "Our Company";

  return (
    <footer className="bg-foreground/5 text-foreground py-16 border-t border-foreground/10 relative z-10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-2 gap-12 mb-12">
          
          <div className="col-span-2 space-y-4 text-foreground/80 text-center">
            <h3 className="text-3xl font-black tracking-tight text-foreground">{companyName}</h3>
            <p className="max-w-md mx-auto">Crafting exceptional experiences and building the future of our industry, one step at a time.</p>
            {content?.contactEmail && (
              <p className="pt-2"><a href={`mailto:${content.contactEmail}`} className="hover:text-primary transition-colors">{content.contactEmail}</a></p>
            )}
          </div>

          <div className="space-y-4 text-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item, index) => (
                <li key={index}><Link href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {content?.socialLinks && content.socialLinks.length > 0 && (
            <div className="space-y-4 text-center">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">Follow Us</h4>
              <ul className="space-y-2">
                {content.socialLinks.map((social, index) => (
                  <li key={index}><a href={social.url} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition-colors">{social.platform}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>© {currentYear} {companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterStandardDesktop({ navigation, content }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const companyName = content?.companyName || "Our Company";

  return (
    <footer className="bg-foreground/5 text-foreground py-16 border-t border-foreground/10 relative z-10">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-2 space-y-4 text-foreground/80">
            <h3 className="text-2xl font-black tracking-tight text-foreground">{companyName}</h3>
            <p className="max-w-sm">Crafting exceptional experiences and building the future of our industry, one step at a time.</p>
            {content?.contactEmail && (
              <p className="pt-2"><a href={`mailto:${content.contactEmail}`} className="hover:text-primary transition-colors">{content.contactEmail}</a></p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item, index) => (
                <li key={index}><Link href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {content?.socialLinks && content.socialLinks.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">Follow Us</h4>
              <ul className="space-y-2">
                {content.socialLinks.map((social, index) => (
                  <li key={index}><a href={social.url} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition-colors">{social.platform}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>© {currentYear} {companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterStandard(props: FooterProps) {
  const device = useDeviceViewport();
  if (device === "mobile") return <FooterStandardMobile {...props} />;
  if (device === "tablet") return <FooterStandardTablet {...props} />;
  return <FooterStandardDesktop {...props} />;
}

// -- Variant: Minimal ---------------------------------------------------------
// Super clean, mostly centered footer.

function FooterMinimal({ navigation, content }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const companyName = content?.companyName || "Our Company";

  return (
    <footer className="bg-foreground/5 text-foreground py-12 border-t border-foreground/10 relative z-10">
      <div className="container mx-auto px-6 text-center space-y-8">
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          {companyName}
        </h3>
        
        <nav className="flex flex-wrap justify-center gap-6">
          {navigation.map((item, index) => (
            <Link key={index} href={item.href} className="text-foreground/70 hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-foreground/40">
          © {currentYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// -- Component Map ------------------------------------------------------------

const FOOTER_VARIANTS: Record<TenantLayout["footerStyle"], React.FC<FooterProps>> = {
  standard: FooterStandard,
  minimal: FooterMinimal,
};

const DEFAULT_VARIANT: TenantLayout["footerStyle"] = "standard";

// -- Main Export --------------------------------------------------------------

export default function Footer(props: FooterProps) {
  const VariantComponent = FOOTER_VARIANTS[props.variant] ?? FOOTER_VARIANTS[DEFAULT_VARIANT];
  return <VariantComponent {...props} />;
}
