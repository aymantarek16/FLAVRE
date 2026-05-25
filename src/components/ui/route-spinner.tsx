import { cn } from "@/lib/utils";

export function RouteSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={cn("grid place-items-center gap-3 text-[rgb(var(--accent))]", className)} role="status" aria-live="polite">
      <span className="route-spinner" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
