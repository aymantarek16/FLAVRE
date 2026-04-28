import Image from "next/image";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <section className="container-page grid gap-8 pb-16 lg:grid-cols-[0.9fr_1fr]">
      <div>
        <h1 className="text-4xl font-black md:text-6xl">عن {siteConfig.brand.name}</h1>
        <p className="mt-5 text-lg leading-9 text-[rgb(var(--muted))]">FLAVRE مطعم عربي معاصر يرفع نكهة الفحم والتتبيلات الشرقية إلى تجربة أكثر جرأة: أطباق دسمة، تقديم أنيق، وطلب سريع من الموبايل.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["فحم طبيعي", "تتبيلة خاصة", "تحضير يومي"].map((item) => <Card key={item} className="p-4 text-center font-black">{item}</Card>)}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <Image src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1300&auto=format&fit=crop" alt="مطعم عربي فاخر" width={900} height={700} className="aspect-[4/3] w-full object-cover" />
      </div>
    </section>
  );
}
