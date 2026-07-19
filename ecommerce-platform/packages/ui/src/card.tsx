import { type HTMLAttributes } from "react";

const toneStyles = {
  default: "border-slate-800 bg-slate-950/70",
  success: "border-emerald-500/30 bg-emerald-500/10",
  accent: "border-cyan-500/30 bg-cyan-500/10",
} as const;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: keyof typeof toneStyles;
}

export function Card({
  className,
  tone = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-3xl border p-6 shadow-lg shadow-slate-950/20 backdrop-blur",
        toneStyles[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
