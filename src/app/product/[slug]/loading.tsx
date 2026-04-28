import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <section className="container-page grid gap-8 pb-16 lg:grid-cols-[1fr_430px]">
      <div className="space-y-6">
        <Skeleton className="aspect-[16/10] w-full" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-[620px]" />
    </section>
  );
}
