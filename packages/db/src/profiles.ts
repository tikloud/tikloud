import { pool } from "./client";

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
}

export async function getProfile(sub: string): Promise<Profile | null> {
  const { rows } = await pool.query<Profile>(
    `select id, email, display_name, created_at
     from profiles
     where id = $1
     limit 1`,
    [sub],
  );

  return rows[0] ?? null;
}

export async function getOrCreateProfile(
  sub: string,
  email: string | null,
  displayName: string | null,
): Promise<Profile> {
  const { rows } = await pool.query<Profile>(
    `insert into profiles (id, email, display_name)
     values ($1, $2, $3)
     on conflict (id) do update set
       email = coalesce(excluded.email, profiles.email),
       display_name = coalesce(excluded.display_name, profiles.display_name)
     returning id, email, display_name, created_at`,
    [sub, email, displayName],
  );

  const row = rows[0];
  if (!row) {
    throw new Error("Failed to create profile");
  }
  return row;
}

export async function updateDisplayName(
  sub: string,
  displayName: string,
): Promise<void> {
  await pool.query(
    `update profiles
     set display_name = $2
     where id = $1`,
    [sub, displayName],
  );
}
