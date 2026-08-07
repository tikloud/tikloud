"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input, Label } from "@repo/ui";
import { CheckCircle2 } from "@repo/ui/icons";
import { profileSchema, type ProfileInput } from "@repo/validation/profile";

import { updateProfile } from "@/app/actions/profile";

type Status = "idle" | "saving" | "saved";

export function ProfileForm({ initialName }: { initialName: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: initialName },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("saving");
    setServerError(null);
    const result = await updateProfile(values);

    if (result.success) {
      setStatus("saved");
      return;
    }

    setServerError(result.error);
    setStatus("idle");
  });

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Display name</Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>
      {serverError && <p className="text-sm text-red-600">{serverError}</p>}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save changes"}
        </Button>
        {status === "saved" && (
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700">
            <CheckCircle2 className="size-4" />
            Saved
          </span>
        )}
      </div>
    </form>
  );
}
