import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./Providers";

export const metadata: Metadata = {
  title: "Aura UI - Built with Configuration-Driven UI",
  description: "A gorgeous multi-tenant Next.js application scaffolding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required by next-themes to prevent mismatch
    // on the html tag when it injects the class="dark" attribute client-side.
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased transition-[padding] duration-500 ease-in-out">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
