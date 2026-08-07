"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@repo/supabase/server";
import { waitlistSchema } from "@repo/validation/waitlist";

export type JoinWaitlistResult =
  | { success: true }
  | { success: false; error: string };

export async function joinWaitlist(input: unknown): Promise<JoinWaitlistResult> {
  const parsed = waitlistSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "Enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("waitlist")
    .insert({ email: parsed.data.email });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "You're already on the list." };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  revalidatePath("/waitlist");
  return { success: true };
}
