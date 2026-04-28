import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <section className="container-page max-w-4xl pb-16">
      <h1 className="text-4xl font-black md:text-6xl">الشروط والأحكام</h1>
      <Card className="mt-8 space-y-4 p-6 leading-8 text-[rgb(var(--muted))]">
        <p>الأسعار والعروض قابلة للتغيير حسب توفر المنتجات ووقت الطلب.</p>
        <p>إرسال الطلب عبر واتساب لا يمثل تأكيدًا نهائيًا إلا بعد رد المطعم.</p>
        <p>قد تختلف مدة التجهيز حسب ضغط الفرع وحجم الطلب.</p>
      </Card>
    </section>
  );
}
