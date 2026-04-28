import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OrderStatusTimeline } from "@/components/order/order-status-timeline";

export default function SuccessPage() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center pb-16">
      <Card className="w-full max-w-3xl p-6 text-center md:p-8">
        <CheckCircle2 className="mx-auto text-[rgb(var(--accent))]" size={56} />
        <h1 className="mt-4 text-3xl font-black">تم تجهيز الطلب</h1>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-[rgb(var(--muted))]">تم فتح واتساب برسالة الطلب. تابع حالة الطلب هنا بينما يتم تنسيقه مع المطعم.</p>
        <div className="mt-8 text-right">
          <OrderStatusTimeline />
        </div>
        <Link href="/menu"><Button className="mt-8">طلب جديد</Button></Link>
      </Card>
    </section>
  );
}
