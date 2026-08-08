"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@repo/auth/server";
import { updateDisplayName } from "@repo/db";
import { profileSchema } from "@repo/validation/profile";

export type UpdateProfileResult =
  { success: true } | { success: false; error: string };

export async function updateProfile(
  input: unknown,
): Promise<UpdateProfileResult> {
  const parsed = profileSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "Please provide a valid name." };
  }

  const user = await requireUser();

  await updateDisplayName(user.sub, parsed.data.name);

  revalidatePath("/settings");
  return { success: true };
}
