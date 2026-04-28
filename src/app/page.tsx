import { BestSellers, BranchesPreview, FinalCta, Hero, HomeCategories, OffersStrip, Testimonials, WhyUs } from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeCategories />
      <BestSellers />
      <OffersStrip />
      <WhyUs />
      <BranchesPreview />
      <Testimonials />
      <FinalCta />
    </>
  );
}
