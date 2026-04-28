export type ThemeName = "gold" | "neon" | "dark" | "ruby" | "green" | "blue" | "purple" | "red";
export type OrderType = "delivery" | "pickup";
export type SortMode = "featured" | "price-asc" | "price-desc" | "rating";

export type FeatureFlags = {
  offers: boolean;
  coupons: boolean;
  delivery: boolean;
  pickup: boolean;
  animations: boolean;
  themes: boolean;
  testimonials: boolean;
  faq: boolean;
};

export type Variant = {
  id: string;
  name: string;
  price: number;
};

export type Addon = {
  id: string;
  name: string;
  price: number;
  required?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  image: string;
  rating: number;
  featured?: boolean;
  spicy?: boolean;
  prepTime: string;
  variants: Variant[];
  addons: Addon[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercent: number;
};

export type Branch = {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
};

export type CartItem = {
  id: string;
  productId: string;
  variantId: string;
  addonIds: string[];
  notes?: string;
  quantity: number;
};
