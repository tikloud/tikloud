import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Heading,
  SiteFooter,
  SiteHeader,
} from "@repo/ui";

import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Get early access to the Ti Kloud platform — join the waitlist.",
};

export default function WaitlistPage() {
  return (
    <>
      <SiteHeader
        navItems={[
          { href: "/#features", label: "Features" },
          { href: "/waitlist", label: "Join the waitlist", variant: "button" },
        ]}
      />
      <main className="bg-gradient-to-b from-brand-50 via-white to-white">
        <Container className="flex flex-col items-center py-24">
          <div className="mx-auto max-w-xl text-center">
            <Heading level={1}>Join the waitlist</Heading>
            <p className="mt-4 text-lg text-slate-600">
              Be the first to know when Ti Kloud apps launch. No spam — just
              updates.
            </p>
          </div>
          <Card className="mt-10 w-full max-w-md">
            <CardHeader>
              <CardTitle>Get early access</CardTitle>
              <CardDescription>
                Drop your email below and we&apos;ll add you to the list.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WaitlistForm />
            </CardContent>
          </Card>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
