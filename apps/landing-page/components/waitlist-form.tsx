"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input, Label } from "@repo/ui";
import { CheckCircle2 } from "@repo/ui/icons";
import { waitlistSchema, type WaitlistInput } from "@repo/validation/waitlist";

import { joinWaitlist } from "../app/actions/waitlist";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await joinWaitlist(values);
    if (result.success) {
      setSubmitted(true);
      reset();
      return;
    }
    setServerError(result.error);
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 className="size-10 text-brand-600" />
        <p className="text-lg font-semibold text-slate-900">
          You&apos;re on the list!
        </p>
        <p className="text-sm text-slate-600">
          We&apos;ll be in touch soon with early access details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Work email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      {serverError && <p className="text-sm text-red-600">{serverError}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Joining…" : "Join the waitlist"}
      </Button>
    </form>
  );
}
