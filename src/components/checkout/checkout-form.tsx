"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Store, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { branches } from "@/data/menu";
import { calculateCart } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";
import { generateWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { useAppStore } from "@/store/use-app-store";

const schema = z.object({
  name: z.string().min(2, "اكتب الاسم"),
  phone: z.string().min(8, "رقم الهاتف غير صحيح"),
  orderType: z.enum(["delivery", "pickup"]),
  address: z.string().optional(),
  branch: z.string().optional(),
  scheduledAt: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((value, ctx) => {
  if (value.orderType === "delivery" && !value.address) ctx.addIssue({ code: "custom", path: ["address"], message: "العنوان مطلوب للتوصيل" });
  if (value.orderType === "pickup" && !value.branch) ctx.addIssue({ code: "custom", path: ["branch"], message: "اختيار الفرع مطلوب" });
});

type FormValues = z.infer<typeof schema>;

export function CheckoutForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const cart = useAppStore((state) => state.cart);
  const coupon = useAppStore((state) => state.coupon);
  const clearCart = useAppStore((state) => state.clearCart);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { orderType: "delivery" } });
  const orderType = useWatch({ control: form.control, name: "orderType" }) ?? "delivery";
  const totals = calculateCart(cart, coupon, orderType);

  function onSubmit(values: FormValues) {
    if (cart.length === 0) {
      toast.error("السلة فارغة");
      return;
    }
    setSubmitting(true);
    toast.loading("جاري تجهيز رسالة الطلب", { id: "checkout" });
    const message = generateWhatsAppMessage(cart, { ...values, coupon });
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    clearCart();
    toast.success("تم تجهيز الطلب", { id: "checkout" });
    router.push("/success");
  }

  return (
    <section className="container-page grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="p-5">
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="الاسم" error={form.formState.errors.name?.message}><Input {...form.register("name")} placeholder="اسم العميل" /></Field>
            <Field label="الهاتف" error={form.formState.errors.phone?.message}><Input {...form.register("phone")} placeholder="01xxxxxxxxx" /></Field>
          </div>
          <Field label="نوع الطلب">
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-black/20 p-1">
              {siteConfig.features.delivery && (
                <OrderTypeButton active={orderType === "delivery"} icon={<Truck size={18} />} label="توصيل" onClick={() => form.setValue("orderType", "delivery", { shouldValidate: true })} />
              )}
              {siteConfig.features.pickup && (
                <OrderTypeButton active={orderType === "pickup"} icon={<Store size={18} />} label="استلام" onClick={() => form.setValue("orderType", "pickup", { shouldValidate: true })} />
              )}
            </div>
          </Field>
          <AnimatePresence mode="wait" initial={false}>
            {orderType === "delivery" ? (
              <motion.div key="delivery" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <Field label="العنوان" error={form.formState.errors.address?.message}><Textarea {...form.register("address")} placeholder="المنطقة، الشارع، رقم العمارة، الدور..." /></Field>
              </motion.div>
            ) : (
              <motion.div key="pickup" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <Field label="الفرع" error={form.formState.errors.branch?.message}>
                  <Select {...form.register("branch")}>
                    <option value="">اختر الفرع</option>
                    {branches.map((branch) => <option key={branch.id} value={branch.name}>{branch.name}</option>)}
                  </Select>
                </Field>
              </motion.div>
            )}
          </AnimatePresence>
          <Field label="موعد الطلب">
            <Input type="datetime-local" {...form.register("scheduledAt")} />
          </Field>
          <Field label="ملاحظات عامة">
            <Textarea {...form.register("notes")} placeholder="أي تعليمات إضافية..." />
          </Field>
          <Button size="lg" type="submit" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" size={20} /> : <MessageCircle size={20} />} تأكيد عبر واتساب
          </Button>
        </form>
      </Card>
      <Card className="h-fit space-y-4 p-5 lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black">إجمالي الدفع</h2>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-[rgb(var(--muted))]">{cart.length} منتج</span>
        </div>
        <Row label="المجموع" value={formatPrice(totals.subtotal)} />
        <Row label="الخصم" value={formatPrice(totals.discount)} />
        <Row label="التوصيل" value={formatPrice(totals.deliveryFee)} />
        <div className="border-t border-white/10 pt-3"><Row label="الإجمالي" value={formatPrice(totals.total)} strong /></div>
      </Card>
    </section>
  );
}

function OrderTypeButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring relative flex items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm font-black transition",
        active ? "text-black" : "bg-white/5 text-[rgb(var(--muted))] hover:bg-white/10 hover:text-[rgb(var(--text))]",
      )}
    >
      {active && <motion.span layoutId="checkout-order-type" className="absolute inset-0 rounded-lg bg-[rgb(var(--accent))] shadow-[0_0_28px_rgb(var(--glow)/0.22)]" />}
      <span className="relative">{icon}</span>
      <span className="relative">{label}</span>
    </button>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold"><span>{label}</span>{children}{error && <span className="text-xs text-red-300">{error}</span>}</label>;
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex justify-between ${strong ? "text-lg font-black" : "text-sm text-[rgb(var(--muted))]"}`}><span>{label}</span><motion.span key={value} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{value}</motion.span></div>;
}
