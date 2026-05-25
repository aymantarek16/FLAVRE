import { Skeleton } from "@/components/ui/skeleton";
import { RouteSpinner } from "@/components/ui/route-spinner";

export default function Loading() {
  return (
    <section className="container-page space-y-6 pb-16">
      <RouteSpinner className="py-8" />
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-5 w-full max-w-xl" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-72" />
        ))}
      </div>
    </section>
  );
}
