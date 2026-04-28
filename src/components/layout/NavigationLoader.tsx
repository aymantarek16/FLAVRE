"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

const MIN_VISIBLE_MS = 520;
const FAILSAFE_MS = 2600;

export function NavigationLoader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const startedAt = useRef(0);
  const previousPath = useRef(pathname);
  const hideTimer = useRef<number | null>(null);
  const failsafeTimer = useRef<number | null>(null);

  useEffect(() => {
    function clearTimers() {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      if (failsafeTimer.current) window.clearTimeout(failsafeTimer.current);
    }

    function startLoading() {
      clearTimers();
      startedAt.current = performance.now();
      setVisible(true);
      failsafeTimer.current = window.setTimeout(() => setVisible(false), FAILSAFE_MS);
    }

    function shouldHandleLink(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return false;
      if (anchor.target || anchor.hasAttribute("download")) return false;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return false;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return false;

      return true;
    }

    function onDocumentClick(event: MouseEvent) {
      if (shouldHandleLink(event)) startLoading();
    }

    function onPopState() {
      startLoading();
    }

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("popstate", onPopState);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const elapsed = performance.now() - startedAt.current;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 120);

    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setVisible(false), remaining);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/72 px-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative grid place-items-center text-center"
          >
            <div className="absolute h-48 w-48 rounded-full bg-[rgb(var(--accent)/0.18)] blur-3xl" />
            <div className="glass relative grid w-[min(360px,calc(100vw-48px))] place-items-center gap-5 rounded-lg p-7">
              <div className="relative grid h-28 w-28 place-items-center">
                <motion.div
                  className="absolute inset-0 rounded-full border border-[rgb(var(--accent)/0.2)]"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.45, 0.9, 0.45] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border-2 border-[rgb(var(--accent)/0.85)] border-t-transparent"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-black/45 shadow-[0_0_34px_rgb(var(--glow)/0.18)]">
                  <Image src={siteConfig.brand.logo} alt={siteConfig.brand.name} width={118} height={36} className="w-16" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black">بنحضّر تجربتك</h2>
                <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">لحظة واحدة وننقلك للصفحة التالية</p>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[rgb(var(--accent))] shadow-[0_0_20px_rgb(var(--glow)/0.45)]"
                  initial={{ width: "0%" }}
                  animate={{ width: ["0%", "72%", "100%"] }}
                  transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
