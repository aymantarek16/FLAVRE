import { Card } from "@/components/ui/card";
import { faqs } from "@/data/menu";

export default function FaqPage() {
  return (
    <section className="container-page max-w-4xl space-y-8 pb-16">
      <header>
        <h1 className="text-4xl font-black md:text-6xl">الأسئلة الشائعة</h1>
      </header>
      <div className="grid gap-4">
        {faqs.map((item) => (
          <Card key={item.q} className="p-5">
            <h2 className="text-lg font-black">{item.q}</h2>
            <p className="mt-2 leading-7 text-[rgb(var(--muted))]">{item.a}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
