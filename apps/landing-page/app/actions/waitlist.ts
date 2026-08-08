"use server";

import { revalidatePath } from "next/cache";

import { insertWaitlist } from "@repo/db";
import { waitlistSchema } from "@repo/validation/waitlist";

export type JoinWaitlistResult =
  { success: true } | { success: false; error: string };

export async function joinWaitlist(
  input: unknown,
): Promise<JoinWaitlistResult> {
  const parsed = waitlistSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "Enter a valid email address." };
  }

  try {
    const result = await insertWaitlist(parsed.data.email);

    if (!result.success && result.duplicate) {
      return { success: false, error: "You're already on the list." };
    }
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  revalidatePath("/waitlist");
  return { success: true };
}
