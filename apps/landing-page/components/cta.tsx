import Link from "next/link";

import { cn } from "@repo/ui";
import { Container, Heading } from "@repo/ui";
import { ArrowRight } from "@repo/ui/icons";

export function Cta() {
  return (
    <section className="py-24">
      <Container>
        <div className="rounded-2xl bg-brand-900 px-6 py-16 text-center sm:px-16">
          <Heading level={2} className="text-white">
            Be first in line
          </Heading>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Join the waitlist and get early access to the Ti Kloud platform as
            apps roll out.
          </p>
          <Link
            href="/waitlist"
            className={cn(
              "mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-base font-medium text-brand-900 transition-colors",
              "hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900",
            )}
          >
            Join the waitlist
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
