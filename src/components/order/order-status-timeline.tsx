"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Flame, PackageCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Preparing", text: "تجهيز الطلب", icon: PackageCheck },
  { label: "Cooking", text: "على النار", icon: Flame },
  { label: "On the way", text: "في الطريق", icon: Truck },
];

export function OrderStatusTimeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timers = steps.slice(1).map((_, index) => window.setTimeout(() => setActive(index + 1), (index + 1) * 1800));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 right-0 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_24px_rgb(var(--glow)/0.35)]"
          initial={{ width: "0%" }}
          animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const complete = index < active;
          const current = index === active;
          return (
            <motion.div
              key={step.label}
              animate={{ y: current ? -4 : 0, opacity: index <= active ? 1 : 0.62 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "rounded-lg border p-4 text-center backdrop-blur",
                index <= active ? "border-[rgb(var(--accent)/0.34)] bg-white/10" : "border-white/10 bg-white/5",
              )}
            >
              <div className={cn("mx-auto grid h-11 w-11 place-items-center rounded-full", index <= active ? "bg-[rgb(var(--accent))] text-black" : "bg-white/10 text-[rgb(var(--muted))]")}>
                {complete ? <Check size={20} /> : <Icon size={20} />}
              </div>
              <h3 className="mt-3 font-black">{step.label}</h3>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">{step.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
