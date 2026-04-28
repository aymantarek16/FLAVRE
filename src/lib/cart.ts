import { coupons, siteConfig } from "@/config/site";
import { products } from "@/data/menu";
import type { CartItem } from "@/types";

export function getCartLine(item: CartItem) {
  const product = products.find((entry) => entry.id === item.productId);
  const variant = product?.variants.find((entry) => entry.id === item.variantId);
  const addons = product?.addons.filter((entry) => item.addonIds.includes(entry.id)) ?? [];
  const unitPrice = (variant?.price ?? 0) + addons.reduce((sum, addon) => sum + addon.price, 0);

  return { product, variant, addons, unitPrice, lineTotal: unitPrice * item.quantity };
}

export function calculateCart(items: CartItem[], couponCode?: string, orderType: "delivery" | "pickup" = "delivery") {
  const subtotal = items.reduce((sum, item) => sum + getCartLine(item).lineTotal, 0);
  const coupon = coupons.find((entry) => entry.code.toLowerCase() === couponCode?.toLowerCase());
  const discount = coupon ? coupon.type === "percent" ? Math.round(subtotal * (coupon.value / 100)) : coupon.value : 0;
  const deliveryFee = orderType === "delivery" && subtotal > 0 ? siteConfig.defaults.deliveryFee : 0;
  const total = Math.max(subtotal - discount + deliveryFee, 0);

  return { subtotal, discount, deliveryFee, total, coupon };
}
