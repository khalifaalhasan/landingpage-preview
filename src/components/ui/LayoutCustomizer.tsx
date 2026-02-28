"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, parseCookies } from "nookies";
import { Settings, X, LayoutTemplate, LayoutGrid, MonitorSmartphone, Monitor, Tablet, Smartphone, Sparkles } from "lucide-react";
import type { TenantLayout } from "@/types/tenant";

type PreviewDevice = "desktop" | "tablet" | "mobile";

const COOKIE_NAME = "layout-override";

// Pre-defined Presets
const PRESETS: Record<string, Partial<TenantLayout>> = {
  modern: {
    navbarStyle: "center",
    heroStyle: "centered",
    featuresStyle: "grid",
    collectionStyle: "grid",
    aboutStyle: "split",
    footerStyle: "standard",
  },
  classic: {
    navbarStyle: "left",
    heroStyle: "split",
    featuresStyle: "list",
    collectionStyle: "carousel",
    aboutStyle: "story",
    footerStyle: "standard",
  },
  minimal: {
    navbarStyle: "minimal",
    heroStyle: "minimal",
    featuresStyle: "grid",
    collectionStyle: "carousel",
    aboutStyle: "split",
    footerStyle: "minimal",
  },
};

export default function LayoutCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [overrides, setOverrides] = useState<Partial<TenantLayout>>({});
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [showMockup, setShowMockup] = useState(false);
  const router = useRouter();

  // Load cookies on mount
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies[COOKIE_NAME]) {
      try {
        setOverrides(JSON.parse(cookies[COOKIE_NAME]));
      } catch (e) {
        console.error("Failed to parse layout cookie", e);
      }
    }
  }, []);

  // Sync layout wrapper for device preview
  useEffect(() => {
    const wrapper = document.getElementById("tenant-app-wrapper");
    if (!wrapper) return;

    // Apply data attributes to trigger CSS rules defined at the bottom of THIS component
    if (!showMockup) {
      wrapper.setAttribute("data-mockup", "none");
    } else {
      wrapper.setAttribute("data-mockup", previewDevice);
    }
    
    // Set base dimensions via style for responsive scaling
    wrapper.style.width = previewDevice === "desktop" ? "100%" : "100%";
    
    if (previewDevice === "mobile") {
      wrapper.style.maxWidth = "390px";
      wrapper.style.height = "100dvh";
      wrapper.style.maxHeight = "844px";
      wrapper.style.minHeight = "auto";
      wrapper.style.overflowY = "auto";
      wrapper.style.overflowX = "hidden";
      wrapper.style.marginTop = "40px";
      wrapper.style.marginBottom = "80px";
    } else if (previewDevice === "tablet") {
      wrapper.style.maxWidth = "768px"; // Standard iPad width
      wrapper.style.height = "100dvh";
      wrapper.style.maxHeight = "1024px";
      wrapper.style.minHeight = "auto";
      wrapper.style.overflowY = "auto";
      wrapper.style.overflowX = "hidden";
      wrapper.style.marginTop = "40px";
      wrapper.style.marginBottom = "80px";
    } else {
      // Desktop
      wrapper.style.maxWidth = showMockup ? "1200px" : "100%";
      wrapper.style.height = showMockup ? "80vh" : "auto";
      wrapper.style.minHeight = showMockup ? "auto" : "100vh";
      wrapper.style.overflowY = showMockup ? "auto" : "visible";
      wrapper.style.overflowX = showMockup ? "hidden" : "visible";
      wrapper.style.marginTop = showMockup ? "40px" : "0";
      wrapper.style.marginBottom = showMockup ? "80px" : "0";
    }

  }, [previewDevice, showMockup]);

  const handleUpdate = (newOverrides: Partial<TenantLayout>) => {
    setOverrides(newOverrides);
    setCookie(null, COOKIE_NAME, JSON.stringify(newOverrides), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    router.refresh(); // Trigger Next.js SSR to pick up the new cookie
  };

  const applyPreset = (presetKey: string) => {
    handleUpdate(PRESETS[presetKey]);
  };

  const updateIndividual = (key: keyof TenantLayout, value: string) => {
    handleUpdate({ ...overrides, [key]: value });
  };

  return (
    <>
      {/* Floating Toggle Button & Label Wrapper */}
      <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 transition-all duration-500 ${isOpen ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
        
        {/* Animated Label */}
        <div className="hidden sm:flex flex-col items-end animate-pulse">
          <div className="bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-l-xl rounded-tr-xl shadow-lg relative">
            Customize Layout
            {/* Pointer arrow */}
            <div className="absolute top-1/2 -right-1 flex -translate-y-1/2">
              <div className="w-2 h-2 bg-foreground rotate-45" />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-primary text-white shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Customize Layout"
        >
          <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
        </button>
      </div>

      {/* Floating Panel overlay */}
      <div 
        className={`fixed inset-y-0 right-0 z-[60] w-full max-w-sm bg-background border-l border-foreground/10 shadow-2xl p-6 overflow-y-auto transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">Layout Settings</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors"
          >
             <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Presets Section */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4">Global Presets</h3>
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => applyPreset('modern')}
              className="flex items-center gap-3 p-3 rounded-xl border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
            >
              <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-semibold text-foreground text-sm">Linear Modern</span>
                <span className="block text-xs text-foreground/60">Centered hero, transparent cards</span>
              </div>
            </button>
            
            <button 
              onClick={() => applyPreset('classic')}
              className="flex items-center gap-3 p-3 rounded-xl border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
            >
              <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <MonitorSmartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-semibold text-foreground text-sm">Classic Split</span>
                <span className="block text-xs text-foreground/60">Split layouts, left-aligned nav</span>
              </div>
            </button>

            <button 
              onClick={() => applyPreset('minimal')}
              className="flex items-center gap-3 p-3 rounded-xl border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
            >
              <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <LayoutTemplate className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-semibold text-foreground text-sm">Ultra Minimal</span>
                <span className="block text-xs text-foreground/60">Large typography, radial glows</span>
              </div>
            </button>
          </div>
        </div>

        {/* Device Preview Section */}
        <div className="mb-8 border-t border-foreground/10 pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4">Device Preview</h3>
          
          <div className="flex items-center gap-2 mb-4 bg-foreground/5 p-1 rounded-xl">
            <button 
              onClick={() => setPreviewDevice("desktop")}
              className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${previewDevice === "desktop" ? "bg-background shadow-sm text-primary" : "text-foreground/60 hover:text-foreground"}`}
              title="Desktop View"
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPreviewDevice("tablet")}
              className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${previewDevice === "tablet" ? "bg-background shadow-sm text-primary" : "text-foreground/60 hover:text-foreground"}`}
              title="Tablet View"
            >
              <Tablet className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPreviewDevice("mobile")}
              className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${previewDevice === "mobile" ? "bg-background shadow-sm text-primary" : "text-foreground/60 hover:text-foreground"}`}
              title="Mobile View"
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setShowMockup(!showMockup)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${showMockup ? 'border-primary/50 bg-primary/5 text-primary' : 'border-foreground/10 text-foreground/70 hover:bg-foreground/5'}`}
          >
            <span className="flex items-center gap-2 font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              Realistic Apple Mockup
            </span>
            <div className={`w-8 h-4 rounded-full relative transition-colors ${showMockup ? 'bg-primary' : 'bg-foreground/20'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${showMockup ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </button>
        </div>

        {/* Individual Section Controls */}
        <div>
           <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4 flex items-center justify-between">
              Individual Override
              <button 
                onClick={() => handleUpdate({})} 
                className="text-xs text-primary hover:underline lowercase normal-case flex items-center gap-1"
                title="Reset to tenant JSON config"
              >
                Reset
              </button>
           </h3>
           <div className="space-y-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">Navbar Variant</label>
                <select 
                  value={overrides.navbarStyle || ""} 
                  onChange={(e) => updateIndividual("navbarStyle", e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 text-sm rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                >
                  <option value="" disabled>Select variant...</option>
                  <option value="center">Center Glassmorphism</option>
                  <option value="left">Left Aligned</option>
                  <option value="minimal">Minimal Spread</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">Hero Variant</label>
                <select 
                  value={overrides.heroStyle || ""} 
                  onChange={(e) => updateIndividual("heroStyle", e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 text-sm rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                >
                  <option value="" disabled>Select variant...</option>
                  <option value="centered">Centered 3D Showcase</option>
                  <option value="split">Split Content & Image</option>
                  <option value="minimal">Minimal Typography</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">Features Variant</label>
                <select 
                  value={overrides.featuresStyle || ""} 
                  onChange={(e) => updateIndividual("featuresStyle", e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 text-sm rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                >
                  <option value="" disabled>Select variant...</option>
                  <option value="grid">2x2 Grid Highlights</option>
                  <option value="list">Staggered List Blocks</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">Collection Variant</label>
                <select 
                  value={overrides.collectionStyle || ""} 
                  onChange={(e) => updateIndividual("collectionStyle", e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 text-sm rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                >
                  <option value="" disabled>Select variant...</option>
                  <option value="grid">Masonry Grid</option>
                  <option value="carousel">Horizontal Carousel</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">About Variant</label>
                <select 
                  value={overrides.aboutStyle || ""} 
                  onChange={(e) => updateIndividual("aboutStyle", e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 text-sm rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                >
                  <option value="" disabled>Select variant...</option>
                  <option value="split">Image & Content Split</option>
                  <option value="story">Longform Story with Background</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground/80">Footer Variant</label>
                <select 
                  value={overrides.footerStyle || ""} 
                  onChange={(e) => updateIndividual("footerStyle", e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 text-sm rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
                >
                  <option value="" disabled>Select variant...</option>
                  <option value="standard">Standard Multi-column</option>
                  <option value="minimal">Minimal Centered</option>
                </select>
              </div>

           </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile only */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-background/20 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

      {/* Global Mockup Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Reset styles */
        #tenant-app-wrapper {
          border-radius: 0;
          border: none;
          box-shadow: none;
          margin-left: auto;
          margin-right: auto;
        }

        /* Mobile Mockup (iPhone-like) */
        #tenant-app-wrapper[data-mockup="mobile"] {
          border: 14px solid #171717;
          border-radius: 3rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.1);
          /* Hide scrollbar for native feel */
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        #tenant-app-wrapper[data-mockup="mobile"]::-webkit-scrollbar {
          display: none;
        }
        
        /* iPhone Dynamic Island Simulation */
        #tenant-app-wrapper[data-mockup="mobile"]::before {
          content: "";
          display: block;
          position: sticky;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 30px;
          background-color: #171717;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* Tablet Mockup (iPad-like) */
        #tenant-app-wrapper[data-mockup="tablet"] {
          border: 16px solid #171717;
          border-radius: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.1);
          /* Hide scrollbar for native feel */
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        #tenant-app-wrapper[data-mockup="tablet"]::-webkit-scrollbar {
          display: none;
        }

        /* iPad Camera Hole */
        #tenant-app-wrapper[data-mockup="tablet"]::before {
          content: "";
          display: block;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: #2a2a2a;
          border-radius: 50%;
          z-index: 9999;
        }

        /* Desktop Mockup (Mac-like) */
        #tenant-app-wrapper[data-mockup="desktop"] {
          border: 10px solid #1a1a1a;
          border-top-width: 32px;
          border-radius: 1rem;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6);
        }
        /* Mac Menu Bar Dots */
        #tenant-app-wrapper[data-mockup="desktop"]::before {
          content: "";
          display: block;
          position: absolute;
          top: -20px;
          left: 12px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ff5f56;
          box-shadow: 18px 0 0 #ffbd2e, 36px 0 0 #27c93f;
          z-index: 9999;
        }

        /* Border Light Mode overrides if plain preview */
        #tenant-app-wrapper[data-mockup="none"] {
           border: 1px solid rgba(128,128,128,0.2);
           border-radius: 1rem;
           box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
        }

      `}} />
    </>
  );
}
