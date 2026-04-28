import Link from "next/link";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[65vh] place-items-center">
      <Card className="relative max-w-xl overflow-hidden p-8 text-center">
        <div className="absolute inset-x-12 top-0 h-32 bg-[rgb(var(--accent)/0.18)] blur-3xl" />
        <ChefHat className="relative mx-auto text-[rgb(var(--accent))]" size={64} />
        <h1 className="relative mt-4 text-6xl font-black">404</h1>
        <p className="relative mt-3 leading-7 text-[rgb(var(--muted))]">الصفحة غير موجودة، لكن المنيو في مكانه.</p>
        <Link href="/menu"><Button className="relative mt-6">العودة للمنيو</Button></Link>
      </Card>
    </section>
  );
}
