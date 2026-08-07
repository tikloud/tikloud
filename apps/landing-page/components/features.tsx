import { Card, CardContent, Container, Heading } from "@repo/ui";
import {
  BarChart3,
  Database,
  KeyRound,
  ShieldCheck,
  Zap,
} from "@repo/ui/icons";

const features = [
  {
    icon: KeyRound,
    title: "Authentication built in",
    description:
      "Sign-up, sign-in, and session management backed by Supabase Auth — no boilerplate.",
  },
  {
    icon: Database,
    title: "A database that scales",
    description:
      "Postgres with row-level security, live schemas, and types generated straight from your tables.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Row-level security policies on every table, publishable keys that stay safe on the client.",
  },
  {
    icon: Zap,
    title: "Ship fast with a shared design system",
    description:
      "One set of Tailwind tokens and UI primitives across every app Ti Kloud runs.",
  },
  {
    icon: BarChart3,
    title: "Dashboards that mean business",
    description:
      "Forms validated with Zod, state handled with React Hook Form, data from Supabase.",
  },
  {
    icon: KeyRound,
    title: "One monorepo, every app",
    description:
      "Turborepo keeps builds fast while landing pages, dashboards, and docs evolve together.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Heading level={2}>Everything your org needs, in one place</Heading>
          <p className="mt-4 text-lg text-slate-600">
            A growing suite of applications, all sharing the same foundation.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardContent>
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
