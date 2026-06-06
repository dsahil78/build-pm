import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Singleton Supabase admin client (service role).
 * Only used server-side in API routes.
 * Returns null if env vars are not configured.
 */

let instance: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  if (!instance) {
    instance = createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  return instance;
}
