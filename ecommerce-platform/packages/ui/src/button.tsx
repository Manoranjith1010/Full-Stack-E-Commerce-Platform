import {
  forwardRef,
  type ButtonHTMLAttributes,
} from "react";

const baseStyles =
  "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles = {
  primary:
    "border-slate-200 bg-slate-100 text-slate-950 hover:bg-white",
  secondary:
    "border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500 hover:bg-slate-800",
  ghost:
    "border-transparent bg-transparent text-slate-200 hover:bg-slate-900/80",
} as const;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, type = "button", variant = "primary", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={[baseStyles, variantStyles[variant], className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);
