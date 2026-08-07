"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@repo/supabase/server";
import { profileSchema } from "@repo/validation/profile";

export type UpdateProfileResult =
  | { success: true }
  | { success: false; error: string };

export async function updateProfile(input: unknown): Promise<UpdateProfileResult> {
  const parsed = profileSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "Please provide a valid name." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: parsed.data.name })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: "Could not save your profile." };
  }

  revalidatePath("/settings");
  return { success: true };
}
