import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 py-10">
      <div className="container-page grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Image src={siteConfig.brand.logo} alt={siteConfig.brand.name} width={150} height={45} />
          <p className="max-w-md text-sm leading-7 text-[rgb(var(--muted))]">{siteConfig.brand.description}</p>
          <div className="flex gap-2">
            <Link className="rounded-lg bg-white/10 p-2" href={siteConfig.socials.instagram}><Instagram size={18} /></Link>
            <Link className="rounded-lg bg-white/10 p-2" href={siteConfig.socials.facebook}><Facebook size={18} /></Link>
            <Link className="rounded-lg bg-white/10 p-2" href={`https://wa.me/${siteConfig.contact.whatsapp}`}><MessageCircle size={18} /></Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">روابط</h3>
          <div className="mt-4 grid gap-2 text-sm text-[rgb(var(--muted))]">
            <Link href="/menu">المنيو</Link>
            <Link href="/offers">العروض</Link>
            <Link href="/faq">الأسئلة</Link>
            <Link href="/privacy">الخصوصية</Link>
            <Link href="/terms">الشروط</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">تواصل</h3>
          <div className="mt-4 grid gap-2 text-sm text-[rgb(var(--muted))]">
            <span>{siteConfig.contact.phone}</span>
            <span>{siteConfig.contact.email}</span>
            <span>{siteConfig.contact.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
