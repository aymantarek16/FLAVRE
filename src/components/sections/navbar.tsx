"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Palette, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { themes } from "@/config/themes";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import type { ThemeName } from "@/types";

const links = [
  ["الرئيسية", "/"],
  ["المنيو", "/menu"],
  ["العروض", "/offers"],
  ["الفروع", "/branches"],
  ["تواصل", "/contact"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const cartCount = useAppStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const selectedTheme = themes[theme] ?? themes.gold;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 18);
    setHidden(latest > previous && latest > 150 && !open);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors",
        scrolled ? "border-white/10 bg-black/60 shadow-2xl shadow-black/30" : "border-white/5 bg-black/28",
      )}
    >
      <div className={cn("container-page flex items-center justify-between gap-4 transition-all", scrolled ? "h-16" : "h-20")}>
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src={siteConfig.brand.logo} alt={siteConfig.brand.name} width={150} height={45} className={cn("transition", scrolled && "scale-90")} />
        </Link>

        <nav className="hidden items-center rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-inner shadow-white/5 lg:flex">
          {links.map(([label, href]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-bold transition",
                  active ? "text-black" : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]",
                )}
              >
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_26px_rgb(var(--glow)/0.22)]" transition={{ duration: 0.24 }} />}
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {siteConfig.features.themes && (
            <div className="relative">
              <Button size="icon" variant="secondary" aria-label="اختيار الثيم" onClick={() => setThemeOpen((value) => !value)}>
                <Palette size={18} />
                <span className="absolute bottom-2 left-2 h-2.5 w-2.5 rounded-full border border-black/25" style={{ background: selectedTheme.accent }} />
              </Button>
              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="glass absolute left-0 top-12 grid w-48 gap-1 rounded-lg p-2"
                  >
                    {Object.entries(themes).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setTheme(key as ThemeName);
                          setThemeOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold transition hover:bg-white/10",
                          theme === key ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--muted))]",
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="h-4 w-4 rounded-full" style={{ background: item.accent }} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <Link href="/cart" className="relative">
            <Button size="icon" aria-label="السلة">
              <ShoppingBag size={18} />
            </Button>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -top-2 -left-2 grid h-6 min-w-6 place-items-center rounded-full bg-white px-1 text-xs font-black text-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        <Button className="lg:hidden" size="icon" variant="secondary" aria-label="القائمة" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-page pb-5 lg:hidden"
          >
            <div className="glass grid gap-2 rounded-lg p-3">
              {links.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-[rgb(var(--muted))] hover:bg-white/10">
                  {label}
                </Link>
              ))}
              <div className="flex items-center gap-2 px-2 py-2">
                {Object.entries(themes).slice(0, 5).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={item.label}
                    onClick={() => setTheme(key as ThemeName)}
                    className={cn("h-8 w-8 rounded-full border p-1", theme === key ? "border-[rgb(var(--accent))] bg-white/15" : "border-white/10 bg-white/5")}
                  >
                    <span className="block h-full w-full rounded-full" style={{ background: item.accent }} />
                  </button>
                ))}
              </div>
              <Link href="/cart" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-[rgb(var(--text))] hover:bg-white/10">السلة ({cartCount})</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
