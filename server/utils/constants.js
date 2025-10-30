// Minimal gazetteers to start; easy to extend later.

export const STATES = {
    arizona: "Arizona",
    california: "California",
    colorado: "Colorado",
    nevada: "Nevada",
    newmexico: "New Mexico",
    idaho:"Idaho",
    montana: "Montana",
    oregon: "Oregon",
    utah: "Utah",
    washington: "Washington",
    wyoming: "Wyoming",
    // add more as you go (keep lowercase keys; collapse spaces e.g., "new york" -> "newyork")
};

export const PARK_TYPES = {
    "state park": "state",
    "state parks": "state",
    "national park": "national",
    "national parks": "national",
    "national forest": "national forest",
    "national forests": "national forest",
    "national monument": "national monument",
    "national monuments": "national monument",
    "blm": "blm",
};

export const AMENITY_FLAGS = [
    { key: "has_accessible", value: true, terms: ["accessible", "ada", "wheelchair", "barrier-free"] },
    { key: "has_tent_pads", value: true, terms: ["tent pad", "tent pads", "designated tent pad"] },
    { key: "has_showers", value: true, terms: ["showers", "shower"] },
    { key: "has_hookups", value: true, terms: ["hookups", "full hookups", "electric", "water/electric"] },
    { key: "has_laundry", value: true, terms: ["laundry", "laundromat", "laundries", "washing machines"] },
    { key: "has_drinking_water", value: true, terms: ["drinking water", "potable", "potable water", "water"] },
    { key: "has_fire_ring", value: true, terms: ["fire ring","fire rings", "campfire", "camp fire", "camp fires"] },
    { key: "has_picnic_table", value: true, terms: ["table", "tables", "picnic table", "picnic tables"] },
    { key: "has_rv", value: true, terms: ["rv", "rvs", "rv access", "rvs allowed", "trailer", "trailers", "rv accessible", "trailer accessible"] },
    { key: "has_tents", value: true, terms: ["tent", "tents", "tents allowed"] },
    { key: "has_general_store", value: true, terms: ["store", "supplies", "general store", "grocery store", "grocery"] },
    { key: "has_flushing_toilets", value: true, terms: ["flushing", "flush toilets", "flushing toilets"] },
    { key: "has_shade_shelter", value: true, terms: ["shade shelter", "shelter", "pavilion", "awning", "sun shade"] },
    { key: "has_fuel", value: true, terms: ["gas", "fuel", "gas station", "gasoline", "petrol"] },
    { key: "has_food", value: true, terms: ["food", "restaurant", "bar and grill"] },
    { key: "has_utility_sink", value: true, terms: ["sink", "utility sink", "dishes", "dish washing"] },
    { key: "has_vault_toilets", value: true, terms: ["vault", "vault toilet", "vault toilets", "pit toilet", "pit toilets", "latrine","latrines"] },
    { key: "has_fire_wood", value: true, terms: ["fire wood", "wood"] },
    { key: "has_trash_collection", value: true, terms: ["trash", "trash cans", "dumpster", "dumpsters","recycling"] },
    { key: "has_river_access", value: true, terms: ["river", "river access"] },
    { key: "has_lake_access", value: true, terms: ["lake", "lake access"] },
    { key: "has_dump_station", value: true, terms: ["dump", "dump station", "waste station", "waste water disposal","sewage"] },
    { key: "has_water_spigot", value: true, terms: ["water spigot", "spigot","water faucet","water spout" ] },


];

export const STOPWORDS = new Set([
    "find","show","me","a","an","the","some","with","and","or","near","in","on","at","to","for","please",
    "looking","look","want","i","of","that","which","park","parks","campground","campgrounds"
]);
