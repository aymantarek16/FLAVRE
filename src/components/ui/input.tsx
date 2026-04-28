import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldClass = "focus-ring w-full rounded-lg border border-white/12 bg-[rgb(255_255_255/0.08)] px-4 py-3 text-[rgb(var(--text))] shadow-inner shadow-black/20 placeholder:text-[rgb(var(--muted))] transition hover:border-white/20 focus:border-[rgb(var(--accent)/0.65)]";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClass, "min-h-28 resize-none", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(fieldClass, "cursor-pointer appearance-none bg-[linear-gradient(45deg,transparent_50%,rgb(var(--text))_50%),linear-gradient(135deg,rgb(var(--text))_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:18px_50%,24px_50%] bg-no-repeat pe-10", className)} {...props} />;
}
