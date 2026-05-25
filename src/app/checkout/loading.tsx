import { Skeleton } from "@/components/ui/skeleton";
import { RouteSpinner } from "@/components/ui/route-spinner";

export default function CheckoutLoading() {
  return (
    <section className="container-page grid gap-6 pb-16 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <RouteSpinner className="py-8" />
        <Skeleton className="h-[560px]" />
      </div>
      <Skeleton className="h-72" />
    </section>
  );
}
