import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <section className="container-page grid gap-6 pb-16 lg:grid-cols-[1fr_360px]">
      <Skeleton className="h-[560px]" />
      <Skeleton className="h-72" />
    </section>
  );
}
