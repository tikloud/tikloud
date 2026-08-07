# Ti Kloud Docs

The internal documentation site for Ti Kloud. Content is Markdown + MDX stored
under `content/` and rendered at build time — no Supabase dependency.

## Running

```bash
npm run dev:docs   # from the repo root
# or
npm run dev        # from apps/docs
```

Then open <http://localhost:3002>.

## Adding a page

1. Create `content/<section>/<slug>.mdx` with frontmatter:

   ```mdx
   ---
   title: My page
   description: Short subtitle shown under the title.
   order: 1
   ---
   ```

2. Write the body in Markdown/MDX. `Callout`, `Badge`, `Button`, `Card`,
   `Heading`, and `Separator` are available as components.
3. The sidebar, breadcrumbs, and prev/next links update automatically.

See `content/contributing/writing-docs.mdx` for the full guide.

## Stack

- `next-mdx-remote-client` — MDX → server components
- `gray-matter` — frontmatter
- `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
- `@shikijs/rehype` — syntax highlighting
- `@repo/ui` — design system (layout, `Prose`, `Toc`, `Callout`, etc.)

## Building

```bash
npm run build   # from apps/docs
```

All doc pages are prerendered as static HTML at build time.
