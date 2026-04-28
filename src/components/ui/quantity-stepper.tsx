"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantityStepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-grid grid-cols-[40px_42px_40px] items-center overflow-hidden rounded-lg border border-white/10 bg-white/5">
      <Button aria-label="زيادة" size="icon" variant="ghost" onClick={() => onChange(value + 1)}>
        <Plus size={16} />
      </Button>
      <span className="text-center font-bold">{value}</span>
      <Button aria-label="تقليل" size="icon" variant="ghost" onClick={() => onChange(Math.max(1, value - 1))}>
        <Minus size={16} />
      </Button>
    </div>
  );
}
