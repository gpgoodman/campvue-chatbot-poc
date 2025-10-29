import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_PROJECT_URL;
const anon = process.env.SUPABASE_ANON_KEY;
// Optionally allow a server key if you decide to use it later
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
    console.warn("[supabase] SUPABASE_PROJECT_URL missing; DB calls will fail.");
}

export function getSupabase({ useServiceRole = false } = {}) {
    const key = useServiceRole ? service : anon;
    if (!key) {
        console.warn(`[supabase] ${useServiceRole ? "SERVICE" : "ANON"} key missing; DB calls will fail.`);
    }
    return createClient(url, key, {
        auth: { persistSession: false },
    });
}
