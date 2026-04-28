export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-lg bg-white/10 ${className}`} />;
}
