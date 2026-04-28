import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <section className="container-page grid gap-6 pb-16 lg:grid-cols-[1fr_420px]">
      <div>
        <h1 className="text-4xl font-black md:text-6xl">تواصل معنا</h1>
        <Card className="mt-8 p-5">
          <form className="grid gap-4">
            <Input placeholder="الاسم" />
            <Input placeholder="الهاتف" />
            <Textarea placeholder="رسالتك" />
            <Link href={`https://wa.me/${siteConfig.contact.whatsapp}`}><Button type="button" className="w-full"><MessageCircle size={18} /> تواصل عبر واتساب</Button></Link>
          </form>
        </Card>
      </div>
      <Card className="h-fit space-y-5 p-5">
        <Info icon={<Phone size={18} />} label={siteConfig.contact.phone} />
        <Info icon={<Mail size={18} />} label={siteConfig.contact.email} />
        <Info icon={<MapPin size={18} />} label={siteConfig.contact.address} />
      </Card>
    </section>
  );
}

function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="flex items-center gap-3 text-[rgb(var(--muted))]"><span className="text-[rgb(var(--accent))]">{icon}</span>{label}</div>;
}
