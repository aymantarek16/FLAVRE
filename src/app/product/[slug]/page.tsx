import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Star, Utensils } from "lucide-react";
import { ProductConfigurator } from "@/components/menu/product-configurator";
import { UpsellSection } from "@/components/menu/upsell-section";
import { categories, products } from "@/data/menu";
import { getProductUpsells } from "@/lib/upsell";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const category = categories.find((item) => item.id === product.categoryId);
  const upsells = getProductUpsells(product);

  return (
    <section className="container-page grid gap-8 pb-16 lg:grid-cols-[1fr_430px]">
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-black/30">
          <Image src={product.image} alt={product.name} width={1100} height={760} priority className="aspect-[16/10] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/8 to-transparent" />
          <div className="absolute bottom-4 right-4 left-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-4 py-2 text-sm backdrop-blur"><Star size={16} className="fill-[rgb(var(--accent))] text-[rgb(var(--accent))]" /> {product.rating}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-4 py-2 text-sm backdrop-blur"><Clock size={16} /> {product.prepTime}</span>
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-[rgb(var(--accent))]"><Utensils size={17} /> {category?.name}</span>
          <h1 className="mt-3 text-4xl font-black [text-wrap:balance] md:text-6xl">{product.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[rgb(var(--muted))]">{product.description}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["الأحجام", product.variants.length],
            ["الإضافات", product.addons.length],
            ["التقييم", product.rating],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-black text-[rgb(var(--accent))]">{value}</div>
              <div className="mt-1 text-sm text-[rgb(var(--muted))]">{label}</div>
            </div>
          ))}
        </div>
        <UpsellSection items={upsells} title="أضف لمسة تكمل الطبق" subtitle="اقتراحات خفيفة تناسب اختيارك الحالي." />
      </div>
      <ProductConfigurator product={product} />
    </section>
  );
}
