import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs, Prose } from "@repo/ui";

import { DocFooter } from "@/components/doc-footer";
import { getAllSlugs, getDoc, getDocNavigation, getSectionTitle } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getDoc(slug.join("/"));

  if (!result) return {};

  return {
    title: result.doc.frontmatter.title,
    description: result.doc.frontmatter.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const slugString = slug.join("/");
  const result = getDoc(slugString);

  if (!result) notFound();

  const { doc, source } = result;
  const { prev, next } = getDocNavigation(slugString);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs
        items={[
          { href: "/", label: "Docs" },
          { label: getSectionTitle(doc.section) },
          { label: doc.frontmatter.title },
        ]}
      />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
        {doc.frontmatter.title}
      </h1>
      {doc.frontmatter.description && (
        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          {doc.frontmatter.description}
        </p>
      )}
      <Prose className="mt-8">{renderMdx(source)}</Prose>
      <DocFooter prev={prev} next={next} />
    </article>
  );
}
