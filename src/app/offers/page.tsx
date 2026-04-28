import { BadgePercent } from "lucide-react";
import { Card } from "@/components/ui/card";
import { offers } from "@/data/menu";

export default function OffersPage() {
  return (
    <section className="container-page space-y-8 pb-16">
      <header>
        <h1 className="text-4xl font-black md:text-6xl">العروض</h1>
        <p className="mt-3 text-[rgb(var(--muted))]">خصومات مختارة للطلبات السريعة والتجمعات الكبيرة.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-6">
            <BadgePercent className="text-[rgb(var(--accent))]" size={34} />
            <h2 className="mt-4 text-2xl font-black">{offer.title}</h2>
            <p className="mt-2 leading-7 text-[rgb(var(--muted))]">{offer.description}</p>
            <div className="mt-5 inline-flex rounded-lg border border-white/10 bg-white/10 px-4 py-2 font-black">{offer.code}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
