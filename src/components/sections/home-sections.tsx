"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ChevronDown, Clock3, Flame, MapPin, Sparkles, Star, Timer, Truck, Utensils } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MotionSection, fadeUp, staggerContainer, staggerItem } from "@/components/ui/motion";
import { siteConfig } from "@/config/site";
import { branches, categories, offers, testimonials } from "@/data/menu";
import { MenuBrowser } from "@/components/menu/menu-browser";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1]);
  const heroImage = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1800&auto=format&fit=crop";

  return (
    <section ref={ref} className="relative -mt-24 overflow-hidden bg-black pt-24 md:min-h-[calc(100svh-4rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgb(var(--accent)/0.18),transparent_28rem),radial-gradient(circle_at_20%_82%,rgb(var(--accent-2)/0.14),transparent_30rem),linear-gradient(180deg,rgb(0_0_0),rgb(var(--bg)))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.08),rgb(0_0_0/0.82))]" />
      <div className="hero-steam" aria-hidden="true">
        <span className="steam-wisp steam-wisp-1" />
        <span className="steam-wisp steam-wisp-2" />
        <span className="steam-wisp steam-wisp-3" />
      </div>

      <div className="container-page relative z-10 grid gap-8 py-10 md:min-h-[calc(100svh-6rem)] md:grid-cols-[1.08fr_0.92fr] md:items-center md:gap-12 md:py-16" dir="ltr">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -28, scale: 0.98 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative h-[42svh] min-h-[320px] overflow-hidden rounded-lg border border-[rgb(var(--accent)/0.20)] bg-black shadow-[0_34px_120px_rgb(0_0_0/0.52),0_0_54px_rgb(var(--glow)/0.08)] md:h-[min(68svh,640px)]"
        >
          <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}>
            <Image
              src={heroImage}
              alt="طبق مشويات فاخر من FLAVRE"
              fill
              priority
              quality={88}
              sizes="(max-width: 768px) 100vw, 56vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.10)_0%,rgb(0_0_0/0.18)_48%,rgb(0_0_0/0.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_26%,transparent_0,transparent_14rem,rgb(0_0_0/0.42)_100%)]" />
          <div className="absolute right-5 bottom-5 left-5 rounded-lg border border-white/10 bg-black/54 p-4 text-right shadow-[0_20px_70px_rgb(0_0_0/0.42)] backdrop-blur-xl" dir="rtl">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-[rgb(var(--accent))] px-3 py-1 text-sm font-black text-black">من 280 ج</span>
              <div>
                <p className="text-sm text-white/62">اختيار الشيف</p>
                <h3 className="mt-1 text-xl font-black">ميكس جريل فاخر</h3>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          dir="rtl"
          className="flex w-full flex-col items-center gap-7 text-center md:items-end md:text-right"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={staggerItem} className="hidden h-px w-36 self-start  bg-gradient-to-l from-[rgb(var(--accent))] to-transparent md:block" />
          <motion.div variants={staggerItem} className="flex w-full flex-wrap justify-center gap-2 md:justify-start">
            {[
              { icon: Flame, label: "طازج يوميًا" },
              { icon: Truck, label: "توصيل سريع" },
              { icon: Star, label: "تقييم 4.9" },
            ].map((badge) => (
              <span key={badge.label} className="inline-flex h-11 items-center gap-2 rounded-lg border border-[rgb(var(--accent)/0.26)] bg-black/48 px-4 text-sm font-black text-[rgb(var(--accent))] shadow-[0_0_30px_rgb(var(--glow)/0.14)] backdrop-blur-xl">
                <badge.icon size={17} className={badge.icon === Star ? "fill-[rgb(var(--accent))]" : ""} />
                {badge.label}
              </span>
            ))}
          </motion.div>

          <motion.h1 variants={staggerItem} className="max-w-[590px] font-serif text-4xl font-bold leading-[1.14] [text-wrap:balance] md:text-5xl lg:text-6xl">
            أكل فاخر… معمول على مزاجك
          </motion.h1>
          <motion.p variants={staggerItem} className="max-w-[540px] text-lg leading-9 text-white/78 md:text-xl">
            تجربة طلب أنيقة وسريعة: اختار الطبق، ظبط الحجم والإضافات، وابعت الأوردر على واتساب في ثواني.
          </motion.p>

          <motion.div variants={staggerItem} className="flex w-full flex-col gap-3 sm:flex-row md:justify-start">
            <Link href="/menu" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                اطلب دلوقتي <ArrowLeft size={20} />
              </Button>
            </Link>
            <Link href="/menu" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full border-[rgb(var(--accent)/0.28)] bg-black/22 text-white backdrop-blur hover:bg-white/10 sm:w-auto">
                استعرض المنيو
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={staggerItem} className="grid w-full max-w-[560px] gap-3 md:self-end sm:grid-cols-2">
            <div className="flex min-h-32 flex-col items-end justify-between rounded-lg border border-[rgb(var(--accent)/0.18)] bg-black/42 p-5 shadow-[0_0_34px_rgb(var(--glow)/0.08)] backdrop-blur-xl">
              <Clock3 className="text-[rgb(var(--accent))]" size={20} />
              <div>
                <p className="text-sm text-white/60">متوسط التجهيز</p>
                <p className="mt-1 text-2xl font-black">25 دقيقة</p>
              </div>
            </div>
            <div className="flex min-h-32 flex-col items-end justify-between rounded-lg border border-[rgb(var(--accent)/0.18)] bg-black/42 p-5 shadow-[0_0_34px_rgb(var(--glow)/0.08)] backdrop-blur-xl">
              <Sparkles className="text-[rgb(var(--accent))]" size={20} />
              <div>
                <p className="text-sm text-white/60">تجربة الطلب</p>
                <p className="mt-1 text-2xl font-black">واتساب مباشر</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/68 md:grid"
      >
        <span className="mb-2 h-10 w-px bg-gradient-to-b from-transparent via-white/45 to-transparent" />
        <ChevronDown size={22} />
      </motion.div>
    </section>
  );
}

export function HomeCategories() {
  const featured = categories[0];
  const rest = categories.slice(1);

  return (
    <MotionSection {...fadeUp} className="relative py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_12%,rgb(var(--accent)/0.11),transparent_24rem),radial-gradient(circle_at_10%_85%,rgb(var(--accent-2)/0.10),transparent_26rem)]" />
      <div className="container-page relative space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-black text-[rgb(var(--accent))]">اختار اللي على مزاجك</span>
          </div>
          <p className="max-w-md leading-8 text-[rgb(var(--muted))]">خش على القسم اللي نفسك فيه، وشوف الأطباق من غير دوشة ولا لف كتير.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.24 }}>
            <Link href={`/menu?category=${featured.id}`} className="group block h-full overflow-hidden rounded-lg border border-[rgb(var(--accent)/0.26)] bg-black/30 shadow-[0_28px_100px_rgb(0_0_0/0.38),0_0_48px_rgb(var(--glow)/0.08)]">
              <div className="relative min-h-[440px] overflow-hidden">
                <Image src={featured.image} alt={featured.name} fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.05),rgb(0_0_0/0.34)_48%,rgb(0_0_0/0.9)_100%)]" />
                <div className="absolute right-5 top-5 rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-sm font-black text-black shadow-[0_0_24px_rgb(var(--glow)/0.22)]">الأكتر طلبًا</div>
                <div className="absolute right-5 bottom-5 left-5">
                  <h3 className="text-4xl font-black">{featured.name}</h3>
                  <p className="mt-3 max-w-md leading-7 text-white/72">{featured.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[rgb(var(--accent))]">
                    افتح القسم <ArrowLeft size={17} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((category, index) => (
              <motion.div key={category.id} whileHover={{ y: -6 }} transition={{ duration: 0.22 }}>
                <Link href={`/menu?category=${category.id}`} className="group block overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_0_30px_rgb(var(--glow)/0.035)] transition hover:border-[rgb(var(--accent)/0.28)]">
                  <div className="relative min-h-[212px] overflow-hidden">
                    <Image src={category.image} alt={category.name} fill sizes="(max-width: 768px) 50vw, 24vw" className="object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/24 to-transparent" />
                    <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--accent)/0.22)] bg-black/45 text-sm font-black text-[rgb(var(--accent))] backdrop-blur">
                      {String(index + 2).padStart(2, "0")}
                    </div>
                    <div className="absolute right-4 bottom-4 left-4">
                      <h3 className="text-2xl font-black">{category.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/70">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export function WhyUs() {
  const items = [
    { icon: Flame, title: "فحم ونفس", text: "تسوية هادئة وتتبيلة واضحة في كل قطعة." },
    { icon: Timer, title: "طلب بلا انتظار", text: "اختياراتك محفوظة في السلة ورسالة الطلب جاهزة فور التأكيد." },
    { icon: Sparkles, title: "تقديم مختلف", text: "واجهة داكنة فاخرة، صور قوية، وتفاصيل تشبه المطاعم الراقية." },
  ];
  return (
    <MotionSection variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="container-page grid gap-4 py-12 md:grid-cols-3">
      {items.map((item) => (
        <motion.div key={item.title} variants={staggerItem}>
          <Card className="h-full p-6">
            <item.icon className="text-[rgb(var(--accent))]" size={30} />
            <h3 className="mt-4 text-xl font-black">{item.title}</h3>
            <p className="mt-2 leading-7 text-[rgb(var(--muted))]">{item.text}</p>
          </Card>
        </motion.div>
      ))}
    </MotionSection>
  );
}

export function OffersStrip() {
  if (!siteConfig.features.offers) return null;
  return (
    <MotionSection {...fadeUp} className="container-page py-12">
      <div className="grid gap-4 md:grid-cols-2">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-6">
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-black text-[rgb(var(--accent))]">{offer.code}</span>
            <h3 className="mt-4 text-2xl font-black">{offer.title}</h3>
            <p className="mt-2 leading-7 text-[rgb(var(--muted))]">{offer.description}</p>
          </Card>
        ))}
      </div>
    </MotionSection>
  );
}

export function BranchesPreview() {
  return (
    <MotionSection {...fadeUp} className="container-page space-y-6 py-12">
      <SectionTitle title="قريب منك" subtitle="فروع جاهزة لاستلام الطلب أو تجهيز التوصيل." />
      <div className="grid gap-4 md:grid-cols-3">
        {branches.map((branch) => (
          <Card key={branch.id} className="p-5">
            <MapPin className="text-[rgb(var(--accent))]" />
            <h3 className="mt-4 font-black">{branch.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">{branch.address}</p>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">{branch.hours}</p>
          </Card>
        ))}
      </div>
    </MotionSection>
  );
}

export function Testimonials() {
  if (!siteConfig.features.testimonials) return null;
  return (
    <MotionSection {...fadeUp} className="container-page space-y-6 py-12">
      <SectionTitle title={`قالوا عن ${siteConfig.brand.name}`} subtitle="انطباعات عملاء يحبون الأكل الواضح والتجربة السريعة." />
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.name} className="p-5">
            <div className="flex gap-1 text-[rgb(var(--accent))]">{Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={15} fill="currentColor" />)}</div>
            <p className="mt-4 leading-7 text-[rgb(var(--muted))]">«{item.text}»</p>
            <h3 className="mt-4 font-black">{item.name}</h3>
          </Card>
        ))}
      </div>
    </MotionSection>
  );
}

export function FinalCta() {
  return (
    <MotionSection {...fadeUp} className="relative my-12 overflow-hidden py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgb(var(--accent)/0.18),transparent_30rem),radial-gradient(circle_at_16%_78%,rgb(244_92_38/0.16),transparent_28rem)]" />
      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative order-2 min-h-[420px] overflow-hidden rounded-lg border border-white/10 shadow-[0_30px_120px_rgb(0_0_0/0.45)] lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop"
            alt="مشويات جاهزة للطلب"
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-transparent" />
          <div className="absolute right-5 bottom-5 left-5 rounded-lg border border-white/12 bg-black/62 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/68">متوسط التجهيز</p>
                <h3 className="mt-1 text-2xl font-black">25 دقيقة</h3>
              </div>
              <div className="rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-sm font-black text-black">سخن وطازة</div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-[rgb(var(--accent))]">
            <Utensils size={17} /> طلب سريع من غير لف
          </span>
          <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight [text-wrap:balance] md:text-6xl">
            جعان؟ خلّي الأكل يوصل وهو سخن.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-9 text-[rgb(var(--muted))]">
            اختار طبقك، ظبّط الحجم والإضافات على مزاجك، وابعت الطلب على واتساب بضغطة واحدة.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["01", "اختار الطبق"],
              ["02", "زوّد إضافاتك"],
              ["03", "ابعت الطلب"],
            ].map(([number, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <span className="text-sm font-black text-[rgb(var(--accent))]">{number}</span>
                <p className="mt-2 font-black">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu">
              <Button size="lg">يلا نطلب <ArrowLeft size={20} /></Button>
            </Link>
            <Link href="/offers">
              <Button size="lg" variant="secondary">شوف العروض</Button>
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export function BestSellers() {
  return (
    <section className="py-12">
      <SectionTitle title="الأطباق اللي بتخلص بسرعة" subtitle="اختيارات مميزة من المشويات والأطباق الشرقية." centered />
      <div className="mt-6"><MenuBrowser featuredOnly /></div>
    </section>
  );
}

function SectionTitle({ title, subtitle, centered }: { title: string; subtitle: string; centered?: boolean }) {
  return (
    <div className={centered ? "container-page text-center" : ""}>
      <h2 className="text-3xl font-black [text-wrap:balance] md:text-4xl">{title}</h2>
      <p className="mt-2 leading-7 text-[rgb(var(--muted))]">{subtitle}</p>
    </div>
  );
}
