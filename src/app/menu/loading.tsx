import { Skeleton } from "@/components/ui/skeleton";

export default function MenuLoading() {
  return (
    <section className="container-page space-y-6 pb-16">
      <div className="space-y-3">
        <Skeleton className="h-14 w-48" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <Skeleton className="h-32" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-96" />
        ))}
      </div>
    </section>
  );
}
