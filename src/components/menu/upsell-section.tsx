"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import type { Product } from "@/types";

export function UpsellSection({
  items,
  title = "يكمل طلبك",
  subtitle = "اقتراحات بسيطة مبنية على اختيارك الحالي.",
  compact = false,
}: {
  items: Product[];
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const addItem = useAppStore((state) => state.addItem);

  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <span className="inline-flex items-center gap-2 text-sm font-black text-[rgb(var(--accent))]"><Sparkles size={16} /> اقتراح ذكي</span>
        <h2 className="mt-2 text-2xl font-black">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-[rgb(var(--muted))]">{subtitle}</p>
      </div>
      <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"}>
        {items.map((product, index) => {
          const variant = product.variants[0];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: index * 0.04 }}
            >
              <Card className={compact ? "grid grid-cols-[86px_1fr] gap-3 p-3" : "overflow-hidden"}>
                <Link href={`/product/${product.slug}`} className={compact ? "relative block min-h-24 overflow-hidden rounded-lg" : "relative block aspect-[4/3] overflow-hidden"}>
                  <Image src={product.image} alt={product.name} fill sizes={compact ? "86px" : "(max-width: 768px) 100vw, 30vw"} className="object-cover transition duration-500 hover:scale-105" />
                </Link>
                <div className={compact ? "space-y-2" : "space-y-3 p-4"}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/product/${product.slug}`} className="font-black transition hover:text-[rgb(var(--accent))]">{product.name}</Link>
                      <p className="mt-1 text-sm text-[rgb(var(--muted))]">{formatPrice(variant.price)}</p>
                    </div>
                  </div>
                  <Button
                    size={compact ? "sm" : "md"}
                    className={compact ? "w-full" : ""}
                    onClick={() => {
                      addItem({ productId: product.id, variantId: variant.id, addonIds: [], quantity: 1 });
                      toast.success("تمت إضافة الاقتراح للسلة");
                    }}
                  >
                    <Plus size={16} /> إضافة
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
