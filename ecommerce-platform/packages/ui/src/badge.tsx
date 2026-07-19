import { type HTMLAttributes } from "react";

const toneStyles = {
  neutral: "border-slate-700 bg-slate-900/80 text-slate-200",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  accent: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof toneStyles;
}

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]",
        toneStyles[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
