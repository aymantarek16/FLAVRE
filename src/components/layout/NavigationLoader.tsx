"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HIDE_DELAY_MS = 90;
const FAILSAFE_MS = 2200;
const PREFETCH_ROUTES = ["/", "/menu", "/offers", "/branches", "/contact", "/cart", "/checkout"];

export function NavigationLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const previousPath = useRef(pathname);
  const hideTimer = useRef<number | null>(null);
  const failsafeTimer = useRef<number | null>(null);
  const prefetched = useRef(false);

  useEffect(() => {
    function clearTimers() {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      if (failsafeTimer.current) window.clearTimeout(failsafeTimer.current);
    }

    function startLoading() {
      clearTimers();
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
    if (prefetched.current) return;
    prefetched.current = true;

    const prefetch = () => {
      PREFETCH_ROUTES.forEach((route) => {
        if (route !== pathname) router.prefetch(route);
      });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(prefetch, { timeout: 1600 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timer = window.setTimeout(prefetch, 700);
    return () => window.clearTimeout(timer);
  }, [pathname, router]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setVisible(false), HIDE_DELAY_MS);
  }, [pathname]);

  return (
    <div aria-hidden={!visible} aria-busy={visible} className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div
        className={`h-1 origin-right bg-[rgb(var(--accent))] shadow-[0_0_18px_rgb(var(--glow)/0.42)] transition duration-200 ${
          visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
      />
      <div
        className={`absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/10 bg-black/72 p-2 shadow-[0_12px_40px_rgb(0_0_0/0.35),0_0_26px_rgb(var(--glow)/0.22)] transition duration-150 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <span className="route-spinner route-spinner-sm" />
      </div>
    </div>
  );
}
