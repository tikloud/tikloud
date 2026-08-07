import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function createClient() {
  return createBrowserClient<Database>(url ?? "", key ?? "");
}
