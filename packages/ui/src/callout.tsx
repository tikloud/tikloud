import type { ComponentProps, ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { cn } from "./utils";

export type CalloutVariant = "info" | "success" | "warning" | "danger";

export interface CalloutProps extends Omit<ComponentProps<"aside">, "title"> {
  variant?: CalloutVariant;
  title?: ReactNode;
}

const variants: Record<
  CalloutVariant,
  { className: string; icon: ReactNode; defaultTitle: string }
> = {
  info: {
    className: "border-brand-200 bg-brand-50 text-brand-900",
    icon: <Info className="size-4 shrink-0" />,
    defaultTitle: "Info",
  },
  success: {
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    icon: <CheckCircle2 className="size-4 shrink-0" />,
    defaultTitle: "Success",
  },
  warning: {
    className: "border-amber-200 bg-amber-50 text-amber-900",
    icon: <AlertTriangle className="size-4 shrink-0" />,
    defaultTitle: "Warning",
  },
  danger: {
    className: "border-red-200 bg-red-50 text-red-900",
    icon: <AlertCircle className="size-4 shrink-0" />,
    defaultTitle: "Danger",
  },
};

export function Callout({
  variant = "info",
  title,
  className,
  children,
  ...props
}: CalloutProps) {
  const { className: variantClasses, icon, defaultTitle } = variants[variant];

  return (
    <aside
      className={cn(
        "mt-4 flex gap-3 rounded-lg border p-4 text-sm leading-relaxed",
        variantClasses,
        className,
      )}
      {...props}
    >
      <span className="mt-0.5">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title ?? defaultTitle}</p>
        <div className="[&_p:not(:first-child)]:mt-1.5">{children}</div>
      </div>
    </aside>
  );
}
