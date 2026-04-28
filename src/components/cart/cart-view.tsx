"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { UpsellSection } from "@/components/menu/upsell-section";
import { calculateCart, getCartLine } from "@/lib/cart";
import { getCartUpsells } from "@/lib/upsell";
import { formatPrice } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

export function CartView() {
  const cart = useAppStore((state) => state.cart);
  const coupon = useAppStore((state) => state.coupon);
  const setCoupon = useAppStore((state) => state.setCoupon);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const removeItem = useAppStore((state) => state.removeItem);
  const clearCart = useAppStore((state) => state.clearCart);
  const totals = calculateCart(cart, coupon);
  const upsells = getCartUpsells(cart);

  if (cart.length === 0) {
    return (
      <section className="container-page grid min-h-[55vh] place-items-center">
        <Card className="max-w-lg p-8 text-center">
          <ShoppingCart className="mx-auto text-[rgb(var(--accent))]" size={44} />
          <h1 className="mt-4 text-2xl font-black">السلة فارغة</h1>
          <p className="mt-2 leading-7 text-[rgb(var(--muted))]">اختر أطباقك المفضلة من المنيو وارجع هنا لتأكيد الطلب.</p>
          <Link href="/menu"><Button className="mt-6">تصفح المنيو</Button></Link>
        </Card>
      </section>
    );
  }

  return (
    <section className="container-page grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <motion.div layout className="space-y-4">
          <AnimatePresence>
            {cart.map((item) => {
              const line = getCartLine(item);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: 0.97 }}
                  transition={{ duration: 0.24 }}
                >
                  <Card className="p-4">
                    <div className="grid gap-4 sm:grid-cols-[112px_1fr]">
                      {line.product?.image && (
                        <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                          <Image src={line.product.image} alt={line.product.name} fill sizes="112px" className="object-cover" />
                        </div>
                      )}
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h2 className="font-black">{line.product?.name}</h2>
                            <p className="mt-1 text-sm text-[rgb(var(--muted))]">{line.variant?.name}</p>
                            {line.addons.length > 0 && <p className="mt-1 text-sm text-[rgb(var(--muted))]">إضافات: {line.addons.map((addon) => addon.name).join("، ")}</p>}
                            {item.notes && <p className="mt-1 text-sm text-[rgb(var(--muted))]">ملاحظات: {item.notes}</p>}
                          </div>
                          <motion.strong key={line.lineTotal} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{formatPrice(line.lineTotal)}</motion.strong>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <QuantityStepper value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} />
                          <Button
                            size="icon"
                            variant="danger"
                            aria-label="حذف"
                            onClick={() => {
                              removeItem(item.id);
                              toast.success("تم حذف المنتج من السلة");
                            }}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <UpsellSection items={upsells} compact title="اقتراحات تكمل الطلب" subtitle="مشروب أو طبق جانبي يوازن السلة الحالية." />
      </div>
      <Card className="h-fit space-y-4 p-5 lg:sticky lg:top-24">
        <h2 className="text-xl font-black">ملخص الطلب</h2>
        <Input placeholder="كود الخصم" value={coupon ?? ""} onChange={(event) => setCoupon(event.target.value || undefined)} />
        <motion.div layout className="space-y-3 text-sm">
          <Row label="المجموع" value={formatPrice(totals.subtotal)} />
          <Row label="الخصم" value={formatPrice(totals.discount)} />
          <Row label="التوصيل" value={formatPrice(totals.deliveryFee)} />
          <div className="border-t border-white/10 pt-3"><Row label="الإجمالي" value={formatPrice(totals.total)} strong /></div>
        </motion.div>
        <Link href="/checkout"><Button className="w-full">إتمام الطلب</Button></Link>
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => {
            clearCart();
            toast.message("تم تفريغ السلة");
          }}
        >
          تفريغ السلة
        </Button>
      </Card>
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-lg font-black" : "text-[rgb(var(--muted))]"}`}>
      <span>{label}</span>
      <motion.span key={value} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{value}</motion.span>
    </div>
  );
}
