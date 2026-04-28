import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <section className="container-page max-w-4xl pb-16">
      <h1 className="text-4xl font-black md:text-6xl">سياسة الخصوصية</h1>
      <Card className="mt-8 space-y-4 p-6 leading-8 text-[rgb(var(--muted))]">
        <p>نستخدم بيانات الطلب فقط لتجهيز رسالة التواصل مع المطعم.</p>
        <p>لا يتم حفظ بياناتك داخل الموقع بعد إرسال الطلب.</p>
        <p>قد يتم استخدام واتساب لإتمام التواصل وتأكيد التفاصيل.</p>
      </Card>
    </section>
  );
}
