import { products } from "@/data/menu";
import type { CartItem, Product } from "@/types";

const productRules: Record<string, string[]> = {
  "mixed-grill": ["mint-lemon", "mezze", "kunafa"],
  "mandi-lamb": ["mint-lemon", "mezze", "kunafa"],
  "shawarma-box": ["mint-lemon", "mezze", "kunafa"],
  mezze: ["mixed-grill", "mint-lemon", "kunafa"],
  kunafa: ["mint-lemon", "shawarma-box"],
  "mint-lemon": ["shawarma-box", "mixed-grill", "kunafa"],
};

const categoryRules: Record<string, string[]> = {
  grills: ["mint-lemon", "mezze", "kunafa"],
  mains: ["mint-lemon", "mezze", "kunafa"],
  starters: ["mixed-grill", "shawarma-box", "mint-lemon"],
  desserts: ["mint-lemon", "shawarma-box"],
  drinks: ["shawarma-box", "mixed-grill", "kunafa"],
};

export function getProductUpsells(product: Product, limit = 3) {
  return pickUpsells([product.id], productRules[product.id] ?? categoryRules[product.categoryId] ?? [], limit);
}

export function getCartUpsells(cart: CartItem[], limit = 3) {
  const productIds = cart.map((item) => item.productId);
  const ruleIds = productIds.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return [...(productRules[id] ?? []), ...(product ? categoryRules[product.categoryId] ?? [] : [])];
  });

  return pickUpsells(productIds, ruleIds, limit);
}

function pickUpsells(excludedIds: string[], preferredIds: string[], limit: number) {
  const excluded = new Set(excludedIds);
  const uniquePreferred = Array.from(new Set(preferredIds));
  const preferred = uniquePreferred
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => product !== undefined)
    .filter((product) => !excluded.has(product.id));
  const fallback = products.filter((product) => !excluded.has(product.id) && !preferred.some((item) => item.id === product.id));

  return [...preferred, ...fallback].slice(0, limit);
}
