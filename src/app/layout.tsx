import type { Metadata } from "next";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { NavigationLoader } from "@/components/layout/NavigationLoader";
import { PageTransition } from "@/components/ui/page-transition";
import { ThemeHydrator } from "@/components/ui/theme-hydrator";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} | مطعم عربي فاخر`,
  description: siteConfig.brand.description,
  icons: [{ rel: "icon", url: siteConfig.brand.favicon }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body>
        <ThemeHydrator />
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10 min-h-screen pt-24">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <NavigationLoader />
        <Toaster richColors position="top-center" dir="rtl" />
      </body>
    </html>
  );
}
