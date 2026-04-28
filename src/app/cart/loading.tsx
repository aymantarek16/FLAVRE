import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <section className="container-page grid gap-6 pb-16 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-40" />
        ))}
      </div>
      <Skeleton className="h-80" />
    </section>
  );
}
