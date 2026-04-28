import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="space-y-8 pb-16">
      <header className="container-page">
        <h1 className="text-4xl font-black md:text-6xl">تأكيد الطلب</h1>
        <p className="mt-3 text-[rgb(var(--muted))]">بعد التأكيد سيتم فتح واتساب برسالة الطلب جاهزة.</p>
      </header>
      <CheckoutForm />
    </div>
  );
}
