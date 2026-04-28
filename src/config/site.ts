import type { FeatureFlags, ThemeName } from "@/types";

export const siteConfig = {
  brand: {
    name: "FLAVRE",
    tagline: "نار هادئة. نكهة عالية.",
    description: "مطعم عربي معاصر يقدم المشويات والأطباق الشرقية بروح فاخرة وتجربة طلب سريعة.",
    logo: "/logo.svg",
    favicon: "/favicon.svg",
  },
  contact: {
    whatsapp: "01148618451",
    phone: "01148618451",
    email: "hello@flavre.test",
    address: "القاهرة الجديدة، مصر",
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
  defaults: {
    theme: "gold" as ThemeName,
    deliveryFee: 35,
    minOrder: 120,
  },
  features: {
    offers: true,
    coupons: true,
    delivery: true,
    pickup: true,
    animations: true,
    themes: true,
    testimonials: true,
    faq: true,
  } satisfies FeatureFlags,
};

export const coupons = [
  { code: "FLAVRE10", type: "percent", value: 10 },
  { code: "ARABIC25", type: "fixed", value: 25 },
] as const;
