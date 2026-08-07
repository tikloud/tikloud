import type { ComponentProps } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Callout,
  Heading,
  Input,
  Label,
  Separator,
  Textarea,
} from "@repo/ui";
import type { MDXComponents } from "mdx/types";

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

const components: MDXComponents = {
  a: MdxLink,
  Badge,
  Button,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Heading,
  Input,
  Label,
  Separator,
  Textarea,
};

export function renderMdx(source: string) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "append" }],
            [rehypeShiki, { theme: "github-light" }],
          ],
        },
      }}
    />
  );
}
