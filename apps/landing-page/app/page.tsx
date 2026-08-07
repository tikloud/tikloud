import { SiteFooter, SiteHeader } from "@repo/ui";

import { Cta } from "@/components/cta";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <SiteHeader
        navItems={[
          { href: "/#features", label: "Features" },
          { href: "/waitlist", label: "Join the waitlist", variant: "button" },
        ]}
      />
      <main>
        <Hero />
        <Features />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
