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
        has_hookups: "Electric Hook Ups",
        has_accessible: "Accessible Sites",
        has_laundry: "Laundry",
        has_drinking_water: "Drinking Water",
        has_fire_ring: "Fire Ring",
        has_picnic_table: "Picnic Table",
        has_rv: "RVs",
        has_tents: "Tents",
        has_general_store: "General Store",
        has_flushing_toilets: "Flushing Toilets",
        has_shade_shelter: "Shade Shelters",
        has_fuel: "Fuel",
        has_food: "Food",
        has_utility_sink: "Utility Sink",
        has_vault_toilets: "Vault Toilets",
        has_fire_wood: "Fire Wood",
        has_trash_collection: "Trash Collection",
        has_river_access: "River Access",
        has_lake_access: "Lake Access",
        has_dump_station: "Dump Station",
        has_water_spigot: "Water Spigot",
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
