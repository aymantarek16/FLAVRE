"use client";

import { useEffect } from "react";
import { themes } from "@/config/themes";
import { useAppStore } from "@/store/use-app-store";

export function ThemeHydrator() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    const selected = themes[theme] ?? themes.gold;
    Object.entries(selected.css).forEach(([key, value]) => root.style.setProperty(key, value));
  }, [theme]);

  return null;
}
