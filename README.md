# Demo BPW - Configuration Driven UI Platform

This project is a cutting-edge **Multi-Tenant Next.js** application built entirely with **Antigravity** (an advanced agentic AI). The platform showcases a revolutionary **Configuration-Driven UI (CDUI)** architecture, designed to deliver customizable, highly performant landing pages seamlessly on the fly. 

## 🚀 Key Features

- **Built 100% by Antigravity**: Every piece of this application—from the middleware routing to the adaptive web design hooks—was built end-to-end by Antigravity based on user prompts.
- **True Multi-Tenancy Engine**: Serve multiple clients from a single codebase. Subdomains (`sepatu.localhost:3000`) instantly map to tenant-specific configuration files automatically.
- **Configuration-Driven UI (CDUI)**: The entire layout, theme, color palette, navigation, and content are injected seamlessly from JSON configuration (`src/config/tenants/*.json`). No hardcoded content.
- **Variant-Based Component Rendering**: Every primary UI component (`Hero`, `Features`, `About`, `Collection`, `Footer`, `Navbar`) supports multiple visual "Variants" (e.g., Grid vs. Carousel, Split vs. Centered) dictated entirely by the JSON configuration. 
- **Adaptive Web Design (Component Splitting)**: Responsive design is handled at the **Component Level**. Instead of hiding HTML blocks using CSS media queries (`display: none`), we use a custom `useDeviceViewport` hook that physically mounts `<HeroMobile />`, `<HeroTablet />`, or `<HeroDesktop />` depending on the device environment or mockup emulator.

## 🛠️ Architecture

### 1. Dynamic Theming (CSS Variables on the Fly)
Themes are not pre-compiled CSS files. Instead, primary and foreground colors are dynamically injected individually per tenant as inline CSS variables into the root `<html style="...">` wrapper. Tailwinds standard `bg-primary` utilities automatically inherit these.

### 2. Layout Customizer Applet
Includes a built-in live debugging and preview wrapper component (`LayoutCustomizer.tsx` and `Mockup.tsx`) that acts as an in-browser iPhone / Tablet visualizer. Real device simulation.

### 3. Subdomain Routing via Middleware
A Next.js Edge Middleware intercepts all incoming requests. It extracts the `domain.tld`, maps it to the respective `[tenant]` folder structure gracefully without changing the user's visible URL. 

## 📂 Project Structure

```text
src/
├── app/
│   ├── [tenant]/       # The Multi-Tenant Dynamic Page structure
│   ├── layout.tsx      # Global HTML and Metadata Layout
├── components/
│   ├── ui/             # Adaptive UI Components (Hero, Navbar, About, etc.)
│   └── icons/          # SVGs and vector assets
├── config/
│   └── tenants/        # JSON Configuration source of truth
├── hooks/
│   └── useDeviceViewport.ts # High-performance viewport detection
├── lib/
│   └── tenant.ts       # Server-side JSON fetching and validation
└── types/              # TypeScript definitions mapping to the JSON structures
```

## ⚙️ How to Get Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run the Development Server**
   ```bash
   npm run dev
   ```
3. **Test the Multi-Tenant Subdomain Locally**
   Add `127.0.0.1 sepatu.localhost` to your local `hosts` file to test subdomains locally. Then visit:
   `http://sepatu.localhost:3000`

---
*Generated autonomously by **Antigravity** — The AI software engineer.*
