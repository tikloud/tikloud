import { Pool } from "pg";

declare global {
  var tikloudPool: Pool | undefined;
}
function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
  });
}

export const pool = globalThis.tikloudPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.tikloudPool = pool;
}
