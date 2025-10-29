import { getSupabase } from "./supabase.js";

/**
 * Applies structured filters to campgrounds via the flattened search view.
 * filters example:
 *   { state: "UT", park_type: ["state_park"], has_tent_pads: true, has_showers: true }
 */
export async function searchCampgrounds(filters, { page = 1, pageSize = 20 } = {}) {
    const supabase = getSupabase({ useServiceRole: false });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from("campgrounds_search_v1")
        .select(
            "id, name, slug, park, park_type, state, amenities, activities, thumbnail, thumb_alt, latitude, longitude",
            { count: "exact" }
        );

    // Deterministic filters
    if (filters?.state) {
        query = query.eq("state", filters.state);
    }
    if (Array.isArray(filters?.park_type) && filters.park_type.length) {
        query = query.in("park_type", filters.park_type);
    }

    // Map boolean parser flags → amenity names in your data
    // (Use the *display names* from your amenities table.)
    const amenityMap = {
        has_tent_pads: "Tent Pads",
        has_showers: "Showers",
        has_hookups: "Hookups",
        has_accessible: "Accessible", // when you add this amenity
    };

    const requiredAmenityNames = Object.entries(filters || {})
        .filter(([k, v]) => v === true && amenityMap[k])
        .map(([k]) => amenityMap[k]);

    if (requiredAmenityNames.length) {
        // Supabase JS → Postgres array contains-all: amenities @> ARRAY[...]
        query = query.contains("amenities", requiredAmenityNames);
    }

    query = query.range(from, to).order("name", { ascending: true });

    const { data, error, count } = await query;
    if (error) return { ok: false, error: error.message };
    return { ok: true, data, count, page, pageSize };
}
