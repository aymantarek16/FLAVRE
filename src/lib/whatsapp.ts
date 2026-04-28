import { siteConfig } from "@/config/site";
import { calculateCart, getCartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import type { CartItem, OrderType } from "@/types";

export type CheckoutPayload = {
  name: string;
  phone: string;
  orderType: OrderType;
  address?: string;
  branch?: string;
  scheduledAt?: string;
  notes?: string;
  coupon?: string;
};

export function generateWhatsAppMessage(items: CartItem[], payload: CheckoutPayload) {
  const totals = calculateCart(items, payload.coupon, payload.orderType);
  const lines = items.map((item, index) => {
    const line = getCartLine(item);
    const addons = line.addons.length ? `\n   الإضافات: ${line.addons.map((addon) => addon.name).join("، ")}` : "";
    const notes = item.notes ? `\n   ملاحظات: ${item.notes}` : "";
    return `${index + 1}. ${line.product?.name} - ${line.variant?.name}\n   الكمية: ${item.quantity}\n   السعر: ${formatPrice(line.lineTotal)}${addons}${notes}`;
  });

  return [
    `طلب جديد من ${siteConfig.brand.name}`,
    "",
    `الاسم: ${payload.name}`,
    `الهاتف: ${payload.phone}`,
    `نوع الطلب: ${payload.orderType === "delivery" ? "توصيل" : "استلام من الفرع"}`,
    payload.orderType === "delivery" ? `العنوان: ${payload.address}` : `الفرع: ${payload.branch}`,
    payload.scheduledAt ? `موعد الطلب: ${payload.scheduledAt}` : "موعد الطلب: في أقرب وقت",
    "",
    "المنتجات:",
    ...lines,
    "",
    payload.notes ? `ملاحظات عامة: ${payload.notes}` : "",
    `المجموع الفرعي: ${formatPrice(totals.subtotal)}`,
    totals.discount ? `الخصم: ${formatPrice(totals.discount)}` : "",
    totals.deliveryFee ? `التوصيل: ${formatPrice(totals.deliveryFee)}` : "",
    `الإجمالي: ${formatPrice(totals.total)}`,
  ].filter(Boolean).join("\n");
}

export function getWhatsAppUrl(message: string) {
  const phone = siteConfig.contact.whatsapp.replace(/^0/, "20").replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
