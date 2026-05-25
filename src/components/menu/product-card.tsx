"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Clock, Eye, Flame, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import type { Product } from "@/types";

export function ProductCard({
  product,
  index = 0,
  onPreview,
  spotlight = false,
  priorityImage = false,
}: {
  product: Product;
  index?: number;
  onPreview?: (product: Product) => void;
  spotlight?: boolean;
  priorityImage?: boolean;
}) {
  const addItem = useAppStore((state) => state.addItem);
  const firstVariant = product.variants[0];
  const dishNumber = String(index + 1).padStart(2, "0");

  function quickAdd() {
    addItem({ productId: product.id, variantId: firstVariant.id, addonIds: [], quantity: 1 });
    toast.success("تمت الإضافة للسلة");
  }

  return (
    <div className={cn("h-full transition-transform duration-200 md:hover:-translate-y-2", spotlight && "xl:col-span-2")}>
      <Card
        className={cn(
          "group relative isolate grid h-full min-h-[470px] overflow-hidden rounded-lg border-white/12 bg-black/30 p-0 transition-all duration-500 hover:border-[rgb(var(--accent)/0.34)] hover:shadow-[0_34px_110px_rgb(var(--glow)/0.2)]",
          spotlight && "min-h-[540px]",
        )}
      >
        <Link href={`/product/${product.slug}`} className="absolute inset-0" aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priorityImage}
            quality={82}
            sizes={spotlight ? "(max-width: 1280px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.10),rgb(0_0_0/0.22)_34%,rgb(0_0_0/0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_18%,rgb(var(--accent)/0.22),transparent_22rem)] opacity-0 transition duration-500 group-hover:opacity-100" />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <div className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-black text-white/78 backdrop-blur">
            #{dishNumber}
          </div>
          <div className="flex items-center gap-2">
            {product.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[rgb(var(--accent))] px-3 py-1 text-xs font-black text-black shadow-[0_0_24px_rgb(var(--glow)/0.24)]">
                <Flame size={13} /> اختيار
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-black backdrop-blur">
              <Star size={13} className="fill-[rgb(var(--accent))] text-[rgb(var(--accent))]" />
              {product.rating}
            </span>
          </div>
        </div>

        <div className="absolute left-4 top-4 flex flex-col gap-2 opacity-100 transition md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
          <Button size="icon" variant="secondary" aria-label="معاينة المنتج" onClick={() => onPreview?.(product)} className="bg-black/45 backdrop-blur">
            <Eye size={17} />
          </Button>
          <Button size="icon" aria-label="إضافة سريعة" onClick={quickAdd}>
            <Plus size={17} />
          </Button>
        </div>

        <div className="relative z-10 mt-auto p-4">
          <div className="rounded-lg border border-white/12 bg-black/58 p-4 shadow-[0_18px_60px_rgb(0_0_0/0.42)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Link href={`/product/${product.slug}`} className="text-2xl font-black leading-tight transition hover:text-[rgb(var(--accent))]">
                  {product.name}
                </Link>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-white/68">{product.description}</p>
              </div>
              <div className="shrink-0 rounded-lg bg-[rgb(var(--accent))] px-3 py-2 text-center text-sm font-black text-black shadow-[0_0_28px_rgb(var(--glow)/0.24)]">
                {formatPrice(firstVariant.price)}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/68">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1">
                <Clock size={14} /> {product.prepTime}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1">
                {product.variants.length} أحجام
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1">
                {product.addons.length} إضافات
              </span>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_48px] gap-2">
              <Button onClick={quickAdd} className="h-12">
                <Plus size={18} /> إضافة فورية
              </Button>
              <Link href={`/product/${product.slug}`} aria-label="تخصيص الطبق">
                <Button size="icon" variant="secondary" className="h-12 w-12">
                  <ArrowUpLeft size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
