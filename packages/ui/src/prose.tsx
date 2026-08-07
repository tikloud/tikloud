import type { ComponentProps } from "react";

import { cn } from "./utils";

export function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-slate-700",
        "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-slate-900",
        "[&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-900",
        "[&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-slate-900",
        "[&_h4]:mt-6 [&_h4]:scroll-mt-24 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-slate-900",
        "[&_h5]:mt-6 [&_h5]:scroll-mt-24 [&_h5]:text-lg [&_h5]:font-semibold [&_h5]:text-slate-900",
        "[&_h6]:mt-6 [&_h6]:scroll-mt-24 [&_h6]:text-base [&_h6]:font-semibold [&_h6]:text-slate-900",
        "[&_p]:mt-4 [&_p]:leading-7",
        "[&_p:first-child]:mt-0",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_li]:leading-7",
        "[&_li>p]:mt-0 [&_li>p:first-child]:mt-0",
        "[&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-700",
        "[&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-200 [&_blockquote]:pl-4 [&_blockquote]:text-slate-500",
        "[&_hr]:my-8 [&_hr]:border-slate-200",
        "[&_strong]:font-semibold [&_strong]:text-slate-900",
        "[&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm",
        "[&_th]:border-b [&_th]:border-slate-200 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-slate-900",
        "[&_td]:border-b [&_td]:border-slate-100 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top",
        "[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em] [&_code]:text-slate-900",
        "[&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-slate-200 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed",
        "[&_pre>code]:bg-transparent [&_pre>code]:p-0",
        className,
      )}
      {...props}
    />
  );
}
