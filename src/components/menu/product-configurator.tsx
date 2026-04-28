"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Textarea } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import type { Product } from "@/types";

export function ProductConfigurator({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addItem = useAppStore((state) => state.addItem);

  const selectedVariant = useMemo(() => product.variants.find((item) => item.id === variantId) ?? product.variants[0], [product.variants, variantId]);
  const selectedAddons = useMemo(() => product.addons.filter((item) => addonIds.includes(item.id)), [addonIds, product.addons]);
  const addonTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const unitPrice = selectedVariant.price + addonTotal;
  const total = unitPrice * quantity;

  function toggleAddon(id: string) {
    setAddonIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="glass sticky top-24 space-y-6 rounded-lg p-5">
      <div>
        <span className="inline-flex items-center gap-2 text-sm font-black text-[rgb(var(--accent))]"><Sparkles size={16} /> تخصيص الطبق</span>
        <h2 className="mt-2 text-2xl font-black">ابن طلبك بالطريقة اللي تحبها</h2>
        <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">اختر الحجم، الإضافات، والكمية مع تحديث السعر مباشرة.</p>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold">الحجم</h3>
        <div className="grid gap-2">
          {product.variants.map((variant) => {
            const active = variantId === variant.id;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => setVariantId(variant.id)}
                className={cn(
                  "focus-ring relative flex items-center justify-between overflow-hidden rounded-lg border p-3 text-right transition",
                  active ? "border-[rgb(var(--accent)/0.7)] bg-[rgb(var(--accent)/0.14)]" : "border-white/10 bg-white/5 hover:bg-white/10",
                )}
              >
                {active && <motion.span layoutId="selected-variant" className="absolute inset-0 bg-[rgb(var(--accent)/0.09)]" />}
                <span className="relative font-black">{variant.name}</span>
                <span className="relative text-sm text-[rgb(var(--muted))]">{formatPrice(variant.price)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold">الإضافات</h3>
        <div className="grid gap-2">
          {product.addons.map((addon) => {
            const active = addonIds.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleAddon(addon.id)}
                className={cn(
                  "focus-ring flex items-center justify-between rounded-lg border p-3 text-right transition",
                  active ? "border-[rgb(var(--accent)/0.68)] bg-[rgb(var(--accent)/0.13)]" : "border-white/10 bg-white/5 hover:bg-white/10",
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn("grid h-6 w-6 place-items-center rounded-md border", active ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))] text-black" : "border-white/15")}>
                    <AnimatePresence>{active && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={14} /></motion.span>}</AnimatePresence>
                  </span>
                  <span>{addon.name}</span>
                </span>
                <b>{formatPrice(addon.price)}</b>
              </button>
            );
          })}
        </div>
      </div>
      <Textarea placeholder="ملاحظات على المنتج..." value={notes} onChange={(event) => setNotes(event.target.value)} />
      <div className="rounded-lg border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <motion.strong
            key={total}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl text-[rgb(var(--accent))]"
          >
            {formatPrice(total)}
          </motion.strong>
        </div>
        <div className="mt-3 grid gap-2 text-xs text-[rgb(var(--muted))]">
          <Row label="سعر الوحدة" value={formatPrice(selectedVariant.price)} />
          <Row label="الإضافات" value={formatPrice(addonTotal)} />
          <Row label="الكمية" value={`x${quantity}`} />
        </div>
      </div>
      <Button
        className="w-full"
        size="lg"
        onClick={() => {
          addItem({ productId: product.id, variantId, addonIds, notes, quantity });
          toast.success("تمت إضافة المنتج للسلة");
        }}
      >
        <ShoppingBag size={20} /> إضافة للسلة
      </Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span>{label}</span><span>{value}</span></div>;
}
