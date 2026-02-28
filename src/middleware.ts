import { NextRequest, NextResponse } from "next/server";

// =============================================================================
// SUBDOMAIN ROUTING MIDDLEWARE
// =============================================================================
// Menggunakan pendekatan Clean Architecture:
// 1. Single Source of Truth untuk hostname diambil dari HTTP Headers.
// 2. Environment Variables untuk memisahkan logic Localhost vs Production.
// =============================================================================

const IGNORED_PREFIXES = ["/_next", "/api", "/favicon.ico"];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  // -- Step 1: Skip non-page requests (Early Return) ------------------------
  // Mencegah middleware memproses file statis atau internal Next.js
  if (IGNORED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // -- Step 2: Extract Hostname secara Aman ----------------------------------
  // Best Practice: Gunakan header 'host' karena url.hostname sering tidak
  // akurat di environment lokal tertentu atau saat di balik Reverse Proxy.
  const hostHeader = request.headers.get("host") || "";
  const hostname = hostHeader.split(":")[0]; // Hilangkan port (misal: :3000)

  // -- Step 3: Tentukan Root Domain dari Environment Variables ---------------
  // Wajib buat file .env.local dan isi: NEXT_PUBLIC_ROOT_DOMAIN=localhost
  // Saat di VPS/Vercel, ganti jadi: NEXT_PUBLIC_ROOT_DOMAIN=banggapunyaweb.com
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

  // -- Step 4: Validasi & Ekstrak Tenant (Subdomain) -------------------------
  // Jika akses langsung ke root domain (atau www), biarkan ke halaman utama
  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    return NextResponse.next();
  }

  // Cek apakah hostname diakhiri dengan root domain (validasi subdomain)
  let tenant = "";
  if (hostname.endsWith(`.${rootDomain}`)) {
    // "sepatu.localhost" -> hilangkan ".localhost" -> "sepatu"
    tenant = hostname.replace(`.${rootDomain}`, "");
  }

  // Jika gagal ekstrak tenant (misal host tidak valid), fallback
  if (!tenant) {
    return NextResponse.next();
  }

  // -- Step 5: Rewrite ke Dynamic Route [tenant] -----------------------------
  // Lakukan rewrite transparan agar URL browser tetap sepatu.localhost:3000
  // tapi Next.js me-render file di /src/app/[tenant]/page.tsx
  const rewriteUrl = url.clone();
  rewriteUrl.pathname = `/${tenant}${pathname}`;

  return NextResponse.rewrite(rewriteUrl);
}

// =============================================================================
// MATCHER CONFIGURATION
// =============================================================================
// Optimasi performa: Pastikan middleware tidak tereksekusi untuk asset statis
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};