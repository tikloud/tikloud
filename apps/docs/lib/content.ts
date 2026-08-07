import fs from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";

import type { TocItem } from "@repo/ui";

export interface DocFrontmatter {
  title: string;
  description?: string;
  order: number;
}

export interface Doc {
  slug: string;
  section: string;
  frontmatter: DocFrontmatter;
  headings: TocItem[];
}

export interface Section {
  id: string;
  title: string;
  docs: Doc[];
}

export interface NavDoc {
  slug: string;
  title: string;
}

export interface NavSection {
  id: string;
  title: string;
  docs: NavDoc[];
}

const sectionDefinitions: { id: string; title: string }[] = [
  { id: "getting-started", title: "Getting started" },
  { id: "apps", title: "Apps" },
  { id: "architecture", title: "Architecture & packages" },
  { id: "deployment", title: "Deployment & ops" },
  { id: "contributing", title: "Contributing" },
  { id: "design-system", title: "Design system" },
];

const contentRoot = path.join(process.cwd(), "content");

function walkMdx(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMdx(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractHeadings(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headings: TocItem[] = [];
  let inFence = false;

  for (const rawLine of source.split("\n")) {
    if (rawLine.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(rawLine);
    if (!match) continue;

    const level = match[1]!.length as 2 | 3;
    const text = match[2]!.trim().replace(/`/g, "");
    headings.push({ id: slugger.slug(text), text, level });
  }

  return headings;
}

function loadDoc(filePath: string): { doc: Doc; source: string } {
  const relative = path.relative(contentRoot, filePath);
  const slug = relative
    .replace(/\.mdx$/, "")
    .split(path.sep)
    .join("/");
  const section = slug.split("/")[0] ?? "";

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const frontmatter: DocFrontmatter = {
    title:
      typeof data.title === "string"
        ? data.title
        : (slug.split("/").at(-1) ?? slug),
    description:
      typeof data.description === "string" ? data.description : undefined,
    order:
      typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
  };

  return {
    source,
    doc: { slug, section, frontmatter, headings: extractHeadings(content) },
  };
}

function loadAllDocs(): { doc: Doc; source: string }[] {
  return walkMdx(contentRoot).map(loadDoc);
}

export function getSections(): Section[] {
  const docs = loadAllDocs();
  return sectionDefinitions
    .map(({ id, title }) => ({
      id,
      title,
      docs: docs
        .filter(({ doc }) => doc.section === id)
        .sort((a, b) => a.doc.frontmatter.order - b.doc.frontmatter.order)
        .map(({ doc }) => doc),
    }))
    .filter((section) => section.docs.length > 0);
}

export function getNavTree(): NavSection[] {
  return getSections().map((section) => ({
    id: section.id,
    title: section.title,
    docs: section.docs.map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
    })),
  }));
}

export function getSectionTitle(sectionId: string): string {
  return (
    sectionDefinitions.find(({ id }) => id === sectionId)?.title ?? sectionId
  );
}

export function getAllSlugs(): string[] {
  return loadAllDocs().map(({ doc }) => doc.slug);
}

export function getFirstDocSlug(): string {
  const sections = getSections();
  return sections[0]?.docs[0]?.slug ?? "";
}

export function getDoc(slug: string): { doc: Doc; source: string } | null {
  const filePath = path.join(contentRoot, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return loadDoc(filePath);
}

export function getDocNavigation(slug: string): {
  prev: NavDoc | null;
  next: NavDoc | null;
} {
  const flat = getSections().flatMap((section) =>
    section.docs.map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
    })),
  );

  const index = flat.findIndex((doc) => doc.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? (flat[index - 1] ?? null) : null,
    next: index < flat.length - 1 ? (flat[index + 1] ?? null) : null,
  };
}
