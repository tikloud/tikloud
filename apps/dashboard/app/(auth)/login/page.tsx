import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";

import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Welcome back to your Ti Kloud dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm next={next ?? "/"} />
        <p className="mt-6 text-center text-sm text-slate-500">
          New to Ti Kloud?{" "}
          <Link
            href="/register"
            className="font-medium text-brand-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
