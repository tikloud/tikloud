import type { ComponentProps, ReactNode } from "react";
import { Cloud } from "lucide-react";

import { Container } from "./container";
import { cn } from "./utils";

export interface SiteFooterProps extends ComponentProps<"footer"> {
  brand?: ReactNode;
  copyright?: ReactNode;
}

export function SiteFooter({
  brand,
  copyright,
  className,
  ...props
}: SiteFooterProps) {
  return (
    <footer
      className={cn("border-t border-slate-200 py-12", className)}
      {...props}
    >
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {brand ?? (
            <div className="flex items-center gap-2 font-semibold">
              <Cloud className="size-5 text-brand-600" />
              <span>Ti Kloud</span>
            </div>
          )}
          {copyright ?? (
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Ti Kloud. All rights reserved.
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
