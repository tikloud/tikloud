import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
