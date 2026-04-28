export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="cinematic-bg pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="cinema-base" />
      <div className="cinema-glow cinema-glow-gold" />
      <div className="cinema-glow cinema-glow-ember" />
      <div className="cinema-glow cinema-glow-wine" />
      <div className="cinema-pattern" />
      <div className="cinema-shade" />
      <div className="cinema-noise" />
    </div>
  );
}
