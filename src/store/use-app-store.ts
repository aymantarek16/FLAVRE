"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { siteConfig } from "@/config/site";
import type { CartItem, ThemeName } from "@/types";

type AppState = {
  theme: ThemeName;
  cart: CartItem[];
  coupon?: string;
  setTheme: (theme: ThemeName) => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setCoupon: (coupon?: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: siteConfig.defaults.theme,
      cart: [],
      setTheme: (theme) => set({ theme }),
      addItem: (item) => set((state) => ({ cart: [...state.cart, { ...item, id: crypto.randomUUID() }] })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map((item) => item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item),
      })),
      removeItem: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      clearCart: () => set({ cart: [], coupon: undefined }),
      setCoupon: (coupon) => set({ coupon }),
    }),
    { name: "flavre-template-store" },
  ),
);
