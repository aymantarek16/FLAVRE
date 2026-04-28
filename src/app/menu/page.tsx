import Image from "next/image";
import { Flame, Sparkles, Timer } from "lucide-react";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { products } from "@/data/menu";
import { formatPrice } from "@/lib/utils";

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const chefPick = products.find((product) => product.id === "mixed-grill") ?? products[0];

  return (
    <div className="space-y-10 pb-16">
      <section className="container-page">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/30 p-5 shadow-2xl shadow-black/35 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgb(var(--accent)/0.24),transparent_28rem),linear-gradient(135deg,rgb(255_255_255/0.08),transparent_45%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_390px]">
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-[rgb(var(--accent))]">
                <Sparkles size={16} /> منيو اليوم
              </span>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-none [text-wrap:balance] md:text-7xl">اختار طبقك بتجربة أسرع وأفخم</h1>
              <p className="mt-5 max-w-2xl text-lg leading-9 text-[rgb(var(--muted))]">
                بحث سريع، أقسام واضحة، وكروت طعام مصممة للقرار السريع من غير زحمة بصرية.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Flame, label: "أطباق مميزة", value: products.filter((product) => product.featured).length },
                  { icon: Timer, label: "متوسط التجهيز", value: "25 د" },
                  { icon: Sparkles, label: "تخصيص كامل", value: "100%" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.08] p-4 backdrop-blur">
                    <item.icon className="text-[rgb(var(--accent))]" size={20} />
                    <div className="mt-3 text-2xl font-black">{item.value}</div>
                    <div className="mt-1 text-sm text-[rgb(var(--muted))]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-lg border border-white/10">
              <Image src={chefPick.image} alt={chefPick.name} fill priority sizes="(max-width: 1024px) 100vw, 390px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-transparent" />
              <div className="absolute bottom-5 right-5 left-5">
                <span className="rounded-full bg-[rgb(var(--accent))] px-3 py-1 text-xs font-black text-black">اختيار الشيف</span>
                <h2 className="mt-3 text-2xl font-black">{chefPick.name}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">{chefPick.description}</p>
                <div className="mt-4 text-xl font-black text-[rgb(var(--accent))]">{formatPrice(chefPick.variants[0].price)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MenuBrowser initialCategory={category} />
    </div>
  );
}
