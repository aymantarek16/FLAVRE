import { MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { branches } from "@/data/menu";

export default function BranchesPage() {
  return (
    <section className="container-page space-y-8 pb-16">
      <header>
        <h1 className="text-4xl font-black md:text-6xl">الفروع</h1>
        <p className="mt-3 text-[rgb(var(--muted))]">اختار أقرب فرع للاستلام أو اطلب توصيل لباب البيت.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {branches.map((branch) => (
          <Card key={branch.id} className="p-5">
            <MapPin className="text-[rgb(var(--accent))]" size={32} />
            <h2 className="mt-4 text-xl font-black">{branch.name}</h2>
            <p className="mt-2 leading-7 text-[rgb(var(--muted))]">{branch.address}</p>
            <p className="mt-3 text-sm text-[rgb(var(--muted))]">{branch.hours}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm"><Phone size={16} /> {branch.phone}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
