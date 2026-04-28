"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CakeSlice, CupSoda, Flame, Search, ShoppingBag, SlidersHorizontal, Sparkles, Star, Utensils, X, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/menu/product-card";
import { categories, products } from "@/data/menu";
import { cn, formatPrice } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import type { Product, SortMode } from "@/types";

const categoryIcons: Record<string, LucideIcon> = {
  all: Sparkles,
  grills: Flame,
  mains: Utensils,
  starters: Sparkles,
  desserts: CakeSlice,
  drinks: CupSoda,
};

const sortOptions: { value: SortMode; label: string }[] = [
  { value: "featured", label: "مختارات" },
  { value: "rating", label: "الأعلى تقييما" },
  { value: "price-asc", label: "الأقل سعرا" },
  { value: "price-desc", label: "الأعلى سعرا" },
];

export function MenuBrowser({ featuredOnly = false, initialCategory = "all" }: { featuredOnly?: boolean; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories.some((item) => item.id === initialCategory) ? initialCategory : "all");
  const [sort, setSort] = useState<SortMode>("featured");
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const activeCategory = category === "all" ? undefined : categories.find((item) => item.id === category);

  const filtered = useMemo(() => {
    return products
      .filter((product) => !featuredOnly || product.featured)
      .filter((product) => category === "all" || product.categoryId === category)
      .filter((product) => `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === "price-asc") return a.variants[0].price - b.variants[0].price;
        if (sort === "price-desc") return b.variants[0].price - a.variants[0].price;
        if (sort === "rating") return b.rating - a.rating;
        return Number(b.featured) - Number(a.featured);
      });
  }, [category, featuredOnly, query, sort]);

  return (
    <section className="container-page space-y-6">
      {!featuredOnly && (
        <div className="glass space-y-5 rounded-lg p-4 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-black">استكشف المنيو</h2>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">{filtered.length} طبق متاح{activeCategory ? ` في ${activeCategory.name}` : ""}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => {
                const active = sort === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSort(option.value)}
                    className={cn(
                      "focus-ring relative h-10 overflow-hidden rounded-full px-4 text-sm font-black transition",
                      active ? "text-black" : "border border-white/10 bg-white/5 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]",
                    )}
                  >
                    {active && <motion.span layoutId="sort-pill" className="absolute inset-0 rounded-full bg-[rgb(var(--accent))]" />}
                    <span className="relative inline-flex items-center gap-2">
                      {option.value === "featured" && <SlidersHorizontal size={15} />}
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]" size={19} />
            <Input
              className="h-14 rounded-full border-white/10 bg-black/24 pr-12 text-base"
              placeholder="ابحث عن طبق، مشروب، أو إضافة..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {[{ id: "all", name: "كل المنيو", description: "كل الأطباق", image: products[0].image }, ...categories].map((item) => {
              const active = category === item.id;
              const Icon = categoryIcons[item.id] ?? Sparkles;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={cn(
                    "focus-ring group relative grid min-w-44 grid-cols-[46px_1fr] items-center gap-3 overflow-hidden rounded-lg border p-2 text-right transition",
                    active ? "border-[rgb(var(--accent)/0.45)] bg-[rgb(var(--accent)/0.14)]" : "border-white/10 bg-white/[0.045] hover:bg-white/[0.08]",
                  )}
                >
                  <span className="relative h-12 overflow-hidden rounded-lg">
                    <Image src={item.image} alt={item.name} fill sizes="46px" className="object-cover transition duration-500 group-hover:scale-110" />
                    <span className="absolute inset-0 grid place-items-center bg-black/35">
                      <Icon size={18} className={active ? "text-[rgb(var(--accent))]" : "text-white"} />
                    </span>
                  </span>
                  <span>
                    <span className="block font-black">{item.name}</span>
                    <span className="mt-0.5 block text-xs text-[rgb(var(--muted))]">{item.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onPreview={setPreviewProduct}
              spotlight={!featuredOnly && index === 0}
              priorityImage={!featuredOnly && index < 3}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <p className="rounded-lg border border-white/10 p-8 text-center text-[rgb(var(--muted))]">لا توجد منتجات مطابقة.</p>}
      <ProductPreviewModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
    </section>
  );
}

function ProductPreviewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const addItem = useAppStore((state) => state.addItem);
  const firstVariant = product?.variants[0];

  function quickAdd() {
    if (!product || !firstVariant) return;
    addItem({ productId: product.id, variantId: firstVariant.id, addonIds: [], quantity: 1 });
    toast.success("تمت الإضافة للسلة");
    onClose();
  }

  return (
    <AnimatePresence>
      {product && firstVariant && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="glass max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-72 overflow-hidden">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:hidden" />
              </div>
              <div className="space-y-5 p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-[rgb(var(--accent))]">
                      <Star size={15} fill="currentColor" /> {product.rating}
                    </div>
                    <h2 className="mt-2 text-2xl font-black">{product.name}</h2>
                  </div>
                  <Button size="icon" variant="secondary" aria-label="إغلاق" onClick={onClose}>
                    <X size={18} />
                  </Button>
                </div>
                <p className="leading-8 text-[rgb(var(--muted))]">{product.description}</p>
                <div className="grid gap-2">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                      <span className="font-bold">{variant.name}</span>
                      <span className="text-[rgb(var(--accent))]">{formatPrice(variant.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={quickAdd}>
                    <ShoppingBag size={18} /> إضافة سريعة
                  </Button>
                  <Link href={`/product/${product.slug}`} onClick={onClose}>
                    <Button variant="secondary">تخصيص الطبق</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
