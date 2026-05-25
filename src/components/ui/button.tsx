import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg font-bold transition hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:translate-y-0 disabled:scale-100 disabled:opacity-50",
        variant === "primary" && "bg-[rgb(var(--accent))] text-black shadow-[0_0_32px_rgb(var(--glow)/0.28)] hover:brightness-110",
        variant === "gold" && "bg-[rgb(232_189_101)] text-black shadow-[0_0_36px_rgb(232_189_101/0.28)] hover:bg-[rgb(245_198_97)]",
        variant === "secondary" && "border border-white/10 bg-white/10 text-[rgb(var(--text))] shadow-inner shadow-white/5 hover:bg-white/15",
        variant === "ghost" && "text-[rgb(var(--text))] hover:bg-white/10",
        variant === "danger" && "bg-red-500 text-white shadow-[0_0_28px_rgb(239_68_68/0.25)] hover:bg-red-400",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-5",
        size === "lg" && "h-13 px-7 text-lg",
        size === "icon" && "h-10 w-10 p-0",
        className,
      )}
      {...props}
    />
  );
}
