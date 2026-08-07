import { notFound, redirect } from "next/navigation";

import { getFirstDocSlug } from "@/lib/content";

export default function HomePage() {
  const slug = getFirstDocSlug();

  if (!slug) notFound();
  redirect(`/${slug}`);
}
