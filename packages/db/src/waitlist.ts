import { pool } from "./client";

export type WaitlistInsertResult =
  { success: true } | { success: false; duplicate: boolean };

export async function insertWaitlist(
  email: string,
): Promise<WaitlistInsertResult> {
  try {
    await pool.query(`insert into waitlist (email) values ($1)`, [email]);
    return { success: true };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "23505"
    ) {
      return { success: false, duplicate: true };
    }
    throw error;
  }
}
